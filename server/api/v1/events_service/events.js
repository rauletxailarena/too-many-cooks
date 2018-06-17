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

//GET all event_tags

router.get("/tags", function(req,res) {
  dbQuery("SELECT * FROM event_tags", [], function(err, result) {
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
})

router.get("/:event_id/users", function(req,res) {
  dbQuery("SELECT * FROM event_assistants WHERE event_id = $1", [req.params.event_id], function(err, result) {
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
})

// Store a new event, with location and tags to DB
router.post("/", function(req, res) {
  // Get hold of the body of the request:
  var event_to_store = req.body.event;
  var location_to_store = req.body.location;
  var tag_ids = req.body.event.tag_ids;

  // Store the location first to get the id
  dbQuery("INSERT INTO locations (latitude, longitude, postcode, address, city, description) VALUES ($1, $2, $3, $4, $5, $6) returning *",
  [location_to_store.latitude, location_to_store.longitude, location_to_store.postcode, location_to_store.address, location_to_store.city, location_to_store.description],
  function(err, result) {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      res.set('Access-Control-Allow-Origin', '*')
      var location_id = result.rows[0].id
      var location_stored = result.rows[0]


      // Store the event once we obtain the location id
      dbQuery("INSERT INTO events (host_id, location_id, title, description, type, start_date, slots) VALUES ($1, $2, $3, $4, $5, TO_DATE($6, 'DD/MM/YYYY'), $7) returning *",
      [event_to_store.host_id, location_id, event_to_store.title, event_to_store.description, event_to_store.type, event_to_store.start_date, event_to_store.slots],
      function(err, result) {
        if (err) {
          res.send(err)
        }
        else {
          var event_stored = result.rows[0]
          var object_to_return = {
            "event": event_stored,
            "location": location_stored
          }
          res.send({"event": event_stored,"location": location_stored })
          tag_ids.forEach(function(tag_id) {
            dbQuery("INSERT INTO event_tags (event_id, tag_id) VALUES ($1, $2) returning *",
            [event_stored.id, tag_id],
            function(err, result) {
              if (err) {
                res.send(err)
              }
              else {
                console.log(result.rows[0])
              }
            })
          })

        }
      })
    }
  })
})

// POST an assistant to an event as pending approval
router.post("/:event_id/users/:user_id", function (req, res) {
  dbQuery("INSERT INTO event_assistants (event_id, user_id, status) VALUES ($1, $2, $3) returning *;",
  [req.params.event_id, req.params.user_id, 1],
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


// PUT an assistant to an event as approved or rejected
router.put("/:event_id/users/:user_id", function (req, res) {
  dbQuery("UPDATE event_assistants SET status = $1 WHERE event_id = $2 AND user_id = $3 returning *;",
  [req.body.status, req.params.event_id, req.params.user_id],
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
