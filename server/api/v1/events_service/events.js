var express = require("express")
var router = express.Router()
var dbQuery = require("../../../db/postgres_connection.js").events_query
var aggregator_helper = require("./aggregator_helper.js")

router.use(function timeLog (req,res,next) {
  console.log("Time: " + Date.now())
  console.log(req.body)
  next()
})

// GET ROUTES

// get all events
router.get("/", function (req, res) {

  if (Object.keys(req.query).length !== 0) {
    dbQuery("select events.*, tags.title AS tag_title, locations.latitude, locations.longitude, locations.postcode, locations.address, locations.city, locations.description AS location_description from events JOIN event_tags ON (events.id = event_id) JOIN tags ON (tag_id = tags.id) JOIN locations ON (locations.id = events.location_id);",
    [], function(err, result) {
      if (err) {
        res.status(400)
        res.send(err)
      } else {
        const rowsReturned = []
        result.rows.forEach(function(row) {
          rowsReturned.push(row);
        })
        var aggregated_users = aggregator_helper(rowsReturned)
        res.send(aggregated_users)
      }
    })
  }
  else
  {
    dbQuery("SELECT * FROM events", [], function(err, result) {
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
  }
})

router.post("/", function(req, res) {
  dbQuery("INSERT INTO events (host_id, location_id, title, description, type, start_date, slots) VALUES ($1, $2, $3, $4, $5, TO_DATE($6, 'DD/MM/YYYY'), $7) returning *",
  [req.body.host_id, req.body.location_id, req.body.title, req.body.description, req.body.type, req.body.start_date, req.body.slots],
  function(err, result) {
    if (err) {
      res.status(400)
      res.send(err)
    } else if ("rows" in result) {
        res.send(result.rows[0])
    } else {
      res.set('Access-Control-Allow-Origin', '*')
      res.send(result)
    }
  })
})


// Exports
module.exports = router
