// required modules

var express = require("express"),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express();

// express configuration
// public folder

app.use(express.static(__dirname + "/../client/build"))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.get("/", function(req, res) {
  res.send("Root directory of the webApp")
})

// Start server in port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000")
});
