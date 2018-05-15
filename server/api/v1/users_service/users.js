var express = require("express")
var router = express.Router()
var dbQuery = require("../../../db/postgres_connection.js").users_query

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
    dbQuery("SELECT * FROM users", [], function(err, result) {
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

router.get("/:id", function(req, res) {
  dbQuery("SELECT * FROM users WHERE id = $1", [req.params['id']], function(err, result) {
    res.send(result.rows[0])
  })
})

router.get(":user_id/interests", function(req, res) {
  dbQuery("select interests.id, interests.title from interests JOIN user_interests ON (interests.id = user_interests.interest_id) WHERE user_interests.user_id = $1;",
   [req.params[':user_id']], function(err, result) {
    res.send(result.rows[0])
  })
})

// Get user user interests
router.get("/:id/interests", function(req, res) {
  dbQuery("SELECT interests.id, interests.title FROM users JOIN user_interests ON (users.id = user_interests.user_id) JOIN interests ON (interests.id = user_interests.interest_id) WHERE users.id = $1;",
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
  dbQuery("INSERT INTO users (first_name, last_name, email, date_of_birth, display_name) VALUES ($1, $2, $3, TO_DATE($4, 'DD/MM/YYYY'), $5)",
  [req.body.first_name, req.body.last_name, req.body.email, req.body.date_of_birth, req.body.display_name],
  function(err, result) {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      res.send("User " + req.body.first_name + " " + req.body.last_name + " stored to the DB")
    }
  })
})

// Post interst to user

router.post("/:user_id/interests/:interest_id", function(req, res) {
  console.log("POST /users/:id/interests/:id hit")
  dbQuery("INSERT INTO user_interests (user_id, interest_id) VALUES ($1, $2);",
  [req.params['user_id'], req.params['interest_id']],
  function(err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send("Interes " + req.params.interest_id + " added to user with id: " + req.params.interest_id + ".")
    }
  })
})

// PUT ROUTES

router.put("/:id", function(req, res) {
  dbQuery("UPDATE users SET (first_name, last_name, email, date_of_birth, display_name) = ($1, $2, $3, TO_DATE($4, 'DD/MM/YYYY'), $5) WHERE id = $6",
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
  dbQuery("DELETE FROM users WHERE id = $1",
  [req.params['id']],
  function(err, result) {
    if (err) {
      res.send(err)
    } else {
      if (result.rowCount === 0) {
        res.status(404)
        res.send("User not found")
      } else {
        res.status(200)
        res.send("User with id " + req.params["id"] + " deleted from the DB")
      }
    }
  })
})

// Delete interest from user

router.delete("/:user_id/interests/:interest_id", function(req, res) {
  dbQuery("DELETE FROM user_interests WHERE user_id = $1 and interest_id = $2",
  [req.params['user_id'], req.params['interest_id']],
  function(err, result) {
    if (err) {
      res.send(err)
    } else {
      res.send("Interest:  " + req.params["interest_id"] + " deleted from the DB")
    }
  })
})

// Exports
module.exports = router
