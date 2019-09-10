const Web3 = require("web3");
const Config = require("../Config");
const CryptoPunksMarketAbi = require("../contracts/CryptoPunksMarket.abi");
const CryproPunkDetails = require("../contracts/CryptoPunks.json");
const web3 = new Web3(new Web3.providers.HttpProvider(Config.NETWORK));
const contract = new web3.eth.Contract(CryptoPunksMarketAbi, Config.CONTRACT);
var punksForSale = []; 
var hasStarted = false;

class CryptoPunkService {


     // returns the global array that maintains the punks available for sale
     async getPunksForSale(){
        return punksForSale;
    }
    
    async updatePunksForSale(){

        // Getting all past events about punks offered for sale
        var punksOfferedLogs = await contract.getPastEvents('PunkOffered', {
          fromBlock: Config.STARTBLOCK,
          toBlock: 'latest'
        });
    
        // Saving the punks for sale along with the latest block in which they were offered for sale
        var PunksForSale = new Map();
        for(let i = 0; i < punksOfferedLogs.length; i++){
            PunksForSale.set(punksOfferedLogs[i].returnValues.punkIndex, punksOfferedLogs[i].blockNumber);
        }

        // Getting all past events when punks are no longer for sale
        var punksNoLongerForSaleLogs = await contract.getPastEvents('PunkNoLongerForSale', {
            fromBlock: Config.STARTBLOCK,
            toBlock: 'latest'
        });

        // Getting all past events when punks are bought
        var punksBoughtLogs = await contract.getPastEvents('PunkBought', {
            fromBlock: Config.STARTBLOCK,
            toBlock: 'latest'
        });
        
        /*
        The difference between the punks offered for sale and 
        the punks bought after being offered for sale and
        the punks no longer for sale  after being offered for sale
        will give the punks currently available for sale 
        */
        
        // Deleting punks no longer for sale after being offered for sale
        for(let i = 0; i < punksNoLongerForSaleLogs.length; i++){
            if(PunksForSale.has(punksNoLongerForSaleLogs[i].returnValues.punkIndex)
                && punksNoLongerForSaleLogs[i].blockNumber > 
                PunksForSale.get(punksNoLongerForSaleLogs[i].returnValues.punkIndex)) {

                    PunksForSale.delete(punksNoLongerForSaleLogs[i].returnValues.punkIndex);
            }
        }

        // Deleting punks bought after being offered for sale
        for(let i = 0; i < punksBoughtLogs.length; i++){
            if(PunksForSale.has(punksBoughtLogs[i].returnValues.punkIndex)
                && punksBoughtLogs[i].blockNumber > 
                PunksForSale.get(punksBoughtLogs[i].returnValues.punkIndex)) {

                    PunksForSale.delete(punksBoughtLogs[i].returnValues.punkIndex);
            }
        }

        // Storing the final punks available for sale in the global array to be sent against the API request
        var punksForSaleArr = [];
        var finalPunksAvailableForSale = PunksForSale.keys();
        for(var element of finalPunksAvailableForSale){
            punksForSaleArr.push(parseInt(element));
        }
        punksForSaleArr.sort();
        punksForSale = punksForSaleArr;
    
        if(!hasStarted){
          console.log("################################################");
          console.log("  API Server started, Listening on port: ", Config.PORT);
          console.log("################################################");
          hasStarted = true;
        }
    }

}

module.exports = CryptoPunkService;
  