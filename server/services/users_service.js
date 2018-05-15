// imports

var express = require("express"),
    app = express();
    path = require('path'),
    bodyParser = require('body-parser'),
    pg = require('pg'),
    users = require("../api/v1/users_service/users.js")
    interests = require("../api/v1/users_service/interests.js")
    apiBasepath = "/api/v1"


// express configuration

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


// app routes
app.use(apiBasepath + "/users", users)

app.use(apiBasepath + "/interests", interests)


app.get("/", function(req, res) {
  res.send("Root directory of users service")
})

// Start server in port 3000
app.listen(3001, function() {
  console.log("Users service started on port 3001")
});
