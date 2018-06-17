var express = require("express")
var router = express.Router()
var dbQuery = require("../../../db/postgres_connection.js").events_query

router.get("/", function(req, res) {
  dbQuery("select * from tags;",
  [], function(err, result) {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      const rowsReturned = []
      result.rows.forEach(function(row) {
        rowsReturned.push(row);
      })
      res.send(rowsReturned)
    }
  })
})
// Exports
module.exports = router
