var express = require('express');
var bodyParser = require("body-parser");
var routes = require("./routes/CryptoPunkRoutes");
var app = express();
const Config  = require("./Config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);

var server = app.listen(Config.PORT, function () {
    console.log("CryptoPunk API starting..");
});

const CryptoPunkServices = require("./services/CryptoPunkServices");
const cryptoPunkServices = new CryptoPunkServices();
cryptoPunkServices.updatePunksForSale();

var { updatePunksForSaleCronJob } = require("./CryptoPunksForSaleUpdaterCron");
updatePunksForSaleCronJob();
