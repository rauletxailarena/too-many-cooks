// imports
var express = require("express"),
    app = express();
    path = require('path'),
    bodyParser = require('body-parser'),
    pg = require('pg'),
    communications = require("../api/v1/communications_service/communications.js")
    apiBasepath = "/api/v1"


// express configuration
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-apikey");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, DELETE");
  next();
});

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

// app routes
app.use(apiBasepath + "/communications", communications)



app.get("/", function(req, res) {
  res.send("Root directory of communications service")
})

// Start server in port 3002
app.listen(3003, function() {
  console.log("Communications service started on port 3003")
});
