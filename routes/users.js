var express = require("express")
var router = express.Router()

router.use(function timeLog (req,res,next) {
  console.log("Time: " + Date.now())
  next()
})

router.get("/", function (req, res) {
  if (query) {
    res.send("Some queries in request")
  } else {
    res.send("Users service site")
  }
})

router.get("/new", function (req, res) {
  res.send("New user site")
})

module.exports = router
