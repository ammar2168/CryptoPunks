const CryptoPunkService = require("../services/CryptoPunkServices");

var appRouter = function (app) {
    const cryptoPunkService = new CryptoPunkService();

    app.get("/api/v1/punks-for-sale", function(req, res) {
        cryptoPunkService.getPunksForSale()
          .then(result => {
            return res.status(200).send({ "punks_for_sale": result });
          })
          .catch(error => {
            console.log(error);
            return res.status(400).send({"error" : error});
          });
    });

    app.get("/api/v1/punk/:punkIndex", function(req, res) {
        cryptoPunkService.getPunkInfo(req.params.punkIndex)
          .then(result => {
            return res.status(200).send({ "punk_info": result });
          })
          .catch(error => {
            console.log(error);
            return res.status(400).send({"error" : error});
          });
    });

    app.use((err, req, res, next) => {
      if (!err) return next();
      return res.status(400).json({        
        error: "Invalid punk index, index must be a postive number in the range 0-9999"
      });
    });
}
  
module.exports = appRouter;