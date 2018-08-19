var express = require("express")
var router = express.Router()
var aggregator_helper = require("./aggregator_helper.js")
var models = require("../../../db/mongoose_connection.js")
var mongoose = require("mongoose")


router.use(function timeLog (req,res,next) {
  console.log("Time: " + Date.now())
  console.log(req.body)
  next()
})

// GET ROUTES

// get all events
router.get("/", function (req, res) {
  if (Object.keys(req.query).length !== 0) {
    if ("user_id" in req.query) {
      var user_id = req.query.user_id;
      models.event_model.
      find({"assistants.user_id" : user_id}).
      populate('tags').
      populate('location_id').
      exec(function (err, result) {
        if (err) {
          res.status(400)
           res.send(err)
        } else {
          res.send(result)
        }
      })
    } else if ("host_id" in req.query) {
      var host_id = req.query.host_id
      models.event_model.
      find({"host_id" : host_id}).
      populate('tags').
      populate('location_id').
      exec(function (err, result) {
        if (err) {
          res.status(400)
           res.send(err)
        } else {
          res.send(result)
        }
      })
    }
  }
  else {
    models.event_model.
    find({}).
    populate('tags').
    populate('location_id').
    exec(function (err, result) {
      if (err) {
        res.status(400)
         res.send(err)
      } else {
        res.send(result)
      }
    })
  }
})

// get event by id
router.get("/:event_id", function(req,res) {
  var event_id = req.params.event_id;
  models.event_model.
  findOne({"_id": event_id}).
  populate('tags').
  populate('location_id').
  exec(function (err, result) {
    if (err) {
      res.status(400)
       res.send(err)
    } else {
      res.send(result)
    }
  })
})

// POST Routes

// Store a new event, with location and tags to DB
router.post("/", function(req, res) {
  // Get hold of the body of the request:
  var event_from_body = req.body.event;
  var location_from_body = req.body.location;
  var tags_from_body = req.body.event.tag_ids;

  // Store the location first to get the id
  var location = new models.location_model({
     "_id": new mongoose.Types.ObjectId(),
     "latitude": location_from_body.latitude,
     "longitude": location_from_body.longitude,
     "postcode": location_from_body.postcode,
     "address": location_from_body.address,
     "city": location_from_body.city,
     "description": location_from_body.description,
   })

   models.location_model.create(location)

  var event_to_store = {
    "host_id":event_from_body.host_id ,
    "location_id": location._id,
    "title":event_from_body.title,
    "image_url": event_from_body.image_url,
    "description": event_from_body.description,
    "type": event_from_body.type,
    "start_date": new Date(event_from_body.start_date),
    "slots":event_from_body.slot,
    "assistants": [],
    "tags": event_from_body.tag_ids
  }

  models.event_model.create(event_to_store)
  res.send(req.body)
})

// POST an assistant to an event as pending approval
router.post("/:event_id/users/:user_id", function (req, res) {
  var event_id = req.params.event_id
  var user_id = req.params.user_id
  models.event_model.findOne({"_id": event_id}).
  exec(function (err, event_to_modify) {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      var newUser = {
        "_id": new mongoose.Types.ObjectId(),
        "user_id": user_id,
        "status": 1
      }
      event_to_modify.assistants.push(newUser)
      event_to_modify.slots -= 1
      models.event_model.findOneAndUpdate({"_id": event_id}, event_to_modify, function(err, event) {
        if (err) {
          res.status(400)
          res.send(err)
        } else {
          res.send(event_to_modify)
        }
      })
    }
  })
})

// PUT Routes

// PUT an assistant to an event as approved or rejected
router.put("/:event_id/users/:user_id", function (req, res) {
  var event_id = req.params.event_id
  var user_id = req.params.user_id
  var status = req.body.status
  models.event_model.findOne({"_id": event_id}).
  exec(function (err, event_to_modify) {
    if (err) {
      res.status(400)
      res.send(err)
    } else {
      for (i=0; i<event_to_modify.assistants.length; i++) {
        if (event_to_modify.assistants[i].user_id == user_id) {
          event_to_modify.assistants[i].status = status
          models.event_model.findOneAndUpdate({"_id": event_id}, event_to_modify, function(err, event) {
            if (err) {
              res.status(400)
              res.send(err)
            } else {
              res.send(event_to_modify)
            }
          })
        }
      }
    }
  })
})

// Exports
module.exports = router
