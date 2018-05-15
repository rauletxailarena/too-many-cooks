// required modules

var express = require("express"),
    path = require('path'),
    bodyParser = require('body-parser'),
    pg = require('pg'),
    home = require("./routes/home.js")
    users = require("./api/v1/users_service/users.js")
    interests = require("./api/v1/users_service/interests.js")
    app = express();
    apiBasepath = "/api/v1"


// express configuration
// public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// view engine setting
app.set("views", __dirname + "/views");
app.set("view engine", "jade")


// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))


// app routes
app.use(apiBasepath + "/users", users)

app.use(apiBasepath + "/interests", interests)


app.get("/", function(req, res) {
  res.send("Root directory of the webApp")
})

// Start server in port 3000
app.listen(3000, function() {
  console.log("Server started on port 3000")
});
