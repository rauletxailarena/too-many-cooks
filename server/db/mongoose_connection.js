var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/events')

var LocationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  postcode: String,
  address: String,
  city: String,
  description: String,
});

var TagSchema = new mongoose.Schema({
  title: String
});


var EventSchema = new mongoose.Schema({
  host_id: Number,
  location_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location',
    required: true
  },
  title: String,
  description: String,
  // -- events type:
  // --  1 = free event
  // --  2 = paid event
  type: {
    type: Number,
    min: 0,
    max: 2
  },
  image_url: String,
  start_date: Date,
  slots: Number,
  assistants: [
    {
      user_id: Number,
      status: {
        type: Number,
        min: 1,
        max: 3
      }
    }
  ],
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'tag',
      required: false
    }
  ]
});


module.exports = {
  event_model: mongoose.model('event', EventSchema),
  location_model: mongoose.model('location', LocationSchema),
  tag_model: mongoose.model('tag', TagSchema),
}
