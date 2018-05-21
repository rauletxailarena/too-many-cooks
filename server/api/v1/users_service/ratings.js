var express = require("express")
var router = express.Router()
var dbQuery = require("../../../db/postgres_connection.js").users_query

// GET ROUTES

router.get("/", function (req, res) {

  // if the request includes query parameters
  if (Object.keys(req.query).length !== 0) {
    if ('from_user' in req.query) {
      dbQuery("SELECT * FROM ratings WHERE from_user=$1", [req.query.from_user], function(err, result) {
        if (err) {
          res.send(err)
        } else {
          const rowsReturned = []
          result.rows.forEach(function(row) {
            rowsReturned.push(row);
          })
          res.send(rowsReturned)
        }
      })
    } else if ('to_user' in req.query) {
      dbQuery("SELECT * FROM ratings WHERE to_user=$1", [req.query.to_user], function(err, result) {
        if (err) {
          res.send(err)
        } else {
          const rowsReturned = []
          result.rows.forEach(function(row) {
            rowsReturned.push(row);
          })
          res.send(rowsReturned)
        }
      })
    } else {
      res.send("Some queries in the request..." + JSON.stringify(req.query))

    }

  // if the query doesnt include query parameters
  } else {
    dbQuery("SELECT * FROM ratings", [], function(err, result) {
      if (err) {
        res.send(err)
      } else {
        const rowsReturned = []
        result.rows.forEach(function(row) {
          rowsReturned.push(row);
        })
        res.send(rowsReturned)
      }
    })
  }
})

module.exports = router
