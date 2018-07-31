var express = require("express")
var router = express.Router()
var models = require("../../../db/mongoose_chat_connection.js")
var mongoose = require("mongoose")
var include_participant = require("./communications_helper.js")


router.use(function timeLog (req,res,next) {
  console.log("Time: " + Date.now())
  console.log(req.body)
  next()
})

// GET all the communications
router.get("/", function (req, res) {
  models.chat_model.
  find({}).
  exec(function (err, result) {
    if (err) {
      res.status(400)
       res.send(err)
    } else {
      res.send(result)
    }
  })
})

// GET communication by id
router.get("/:communication_id", function(req,res) {
  var communication_id = req.params.communication_id;
  models.chat_model.
  findOne({"_id": communication_id}).
  exec(function (err, result) {
    if (err) {
      res.status(400)
       res.send(err)
    } else {
      res.send(result)
    }
  })
})

// GET communication by user id
router.get("/user/:user_id", function(req,res) {
  var user_id = req.params.user_id;
  models.chat_model.
  find({"participants.user_id": user_id}).
  exec(function (err, result) {
    if (err) {
      res.status(400)
       res.send(err)
    } else {
      res.send(result)
    }
  })
})

// POST a new chat
router.post("/", function(req, res) {
  var communication = new models.chat_model({
    "id": new mongoose.Types.ObjectId(),
    "participants": [
      {
        "_id": new mongoose.Types.ObjectId(),
        "user_id": req.body.user_id
      },
      {
        "_id": new mongoose.Types.ObjectId(),
        "user_id": req.body.receiver_id
      }
    ],
    "messages": [
      {
        "_id": new mongoose.Types.ObjectId(),
        "sender": req.body.user_id,
        "content": req.body.message,
        "timestamp": new Date()
      }
    ]
  })
  models.chat_model.create(communication)
  res.send(communication)
})

// POST message to existing chat
router.post("/:communication_id", function(req, res) {
  models.chat_model.
  findOne({"_id": req.params.communication_id}).
  exec(function (err, result) {
    if (err) {
      res.status(400)
       res.send(err)
    } else {
      req.body.message.timestamp = new Date()
      result.messages.push(req.body.message)
      result.participants = include_participant(req.body.message.sender, result.participants)
      models.chat_model.create(result)
      res.send(result)
    }
  })
})


// Exports
module.exports = router
