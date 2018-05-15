var express = require("express")
var router = express.Router()
var dbQuery = require("../../../modules/db/postgres_connection.js").users_query


// GET ROUTES

router.get("/", function (req, res) {

  // if the request includes query parameters
  if (Object.keys(req.query).length !== 0) {
    res.send("Some queries in request" + JSON.stringify(req.query))

  // if the query doesnt include query parameters
  } else {
    dbQuery("SELECT * FROM interests", [], function(err, result) {
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

router.get("/:id", function(req, res) {
  dbQuery("SELECT * FROM interests WHERE id = $1", [req.params['id']], function(err, result) {
    res.send(result.rows[0])
  })
})

// POST ROUTES

router.post("/", function(req, res) {
  dbQuery("INSERT INTO interests (title) VALUES ($1)",
  [req.body.title],
  function(err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send("Interest \"" + req.body.title + "\" stored to the DB")
    }
  })
})

//DELETE ROUTES

router.delete("/:id", function(req, res) {
  dbQuery("DELETE FROM interests WHERE id = $1",
  [req.params['id']],
  function(err, result) {
    if (err) {
      res.send(err)
    } else {
      if (result.rowCount === 0) {
        res.status(404)
        res.send("Interest not found")
      } else {
        res.status(200)
        res.send("Interest with id " + req.params["id"] + " deleted from the DB")
      }
    }
  })
})

// Exports
module.exports = router
