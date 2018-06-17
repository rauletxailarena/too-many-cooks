var express = require("express")
var router = express.Router()
var models = require("../../../db/mongoose_connection.js")

router.get("/", function(req, res) {

  models.tag_model.find({}, function(err, result ) {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      res.send(result)
    }
  })
})
// Exports
module.exports = router
