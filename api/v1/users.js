var express = require("express")
var router = express.Router()
var pg = require("../../modules/db/postgres_connection.js")

router.use(function timeLog (req,res,next) {
  console.log("Time: " + Date.now())
  next()
})

// GET ROUTES

router.get("/", function (req, res) {

  // if the request includes query parameters
  if (Object.keys(req.query).length !== 0) {
    res.send("Some queries in request" + JSON.stringify(req.query))

  // if the query doesnt include query parameters
  } else {
    pg.query("SELECT * FROM users", [], function(err, result) {
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
  pg.query("SELECT * FROM users WHERE id = $1", [req.params['id']], function(err, result) {
    res.send(result.rows[0])
  })
})

router.get("/:id/tags", function(req, res) {
  pg.query("SELECT tags.id, tags.title FROM users JOIN user_tags ON (users.id = user_tags.user_id) JOIN tags ON (tags.id = user_tags.tag_id) WHERE users.id = $1;",
  [req.params['id']],
  function(err, result) {
    if (err) {
      res.send(err)
    } else {
      const rowsReturned = []
      result.rows.forEach(function(row) {
        rowsReturned.push(row)
      })
      res.send(rowsReturned)
    }
  })
})

// POST ROUTES

router.post("/", function(req, res) {
  pg.query("INSERT INTO users (first_name, last_name, email, date_of_birth, display_name) VALUES ($1, $2, $3, TO_DATE($4, 'DD/MM/YYYY'), $5)",
  [req.body.first_name, req.body.last_name, req.body.email, req.body.date_of_birth, req.body.display_name],
  function(err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send("User " + req.body.first_name + " " + req.body.last_name + " stored to the DB")
    }
  })
})

// PUT ROUTES

router.put("/:id", function(req, res) {
  pg.query("UPDATE users SET (first_name, last_name, email, date_of_birth, display_name) = ($1, $2, $3, TO_DATE($4, 'DD/MM/YYYY'), $5) WHERE id = $6",
  [req.body.first_name, req.body.last_name, req.body.email, req.body.date_of_birth, req.body.display_name, req.body.id],
  function(err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send("User " + req.body.first_name + " " + req.body.last_name + " updated")
    }
  })
})

// DELETE ROUTES

router.delete("/:id", function(req, res) {
  pg.query("DELETE FROM users WHERE id = $1",
  [req.params['id']],
  function(err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send("User with id " + req.params["id"] + " deleted from the DB")
    }
  })
})

// Exports
module.exports = router
