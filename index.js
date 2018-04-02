// required modules

var express = require("express"),
    path = require('path'),
    bodyParser = require('body-parser'),
    pg = require('pg'),
    home = require("./routes/home.js")
    birds = require("./routes/birds_router_example.js")
    users = require("./routes/users.js")
    app = express();

// express configuration
// public folder
app.use(express.static(path.join(__dirname, "public")));

// view engine setiing
app.set("views", __dirname + "/views");
app.set("view engine", "jade")

// body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

// app routes
app.use("/users", users)

app.get("/", function(req, res) {
  res.send("Root directory of the webApp")
})

// routes
// app.get("/", function(req, res){
//   res.render("home/index", {"title": "myWebsiteTitle"})
// })
//
// app.get("/customers/:id", function(req,res) {
//   res.send("Customer requested: " + req.params["id"])
// })
//
// app.get("/customers", function(req,res) {
//   res.send("Customer selected is " + req.query.id)
// })
// app.get("/jade", function(req, res){
//   res.render("layout")
// })



app.listen(3000, function() {
  console.log("Server started on port 3000")
});
