var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/communications')

var CommunicationsSchema = new mongoose.Schema({
  participants: [
    {
      user_id: Number
    }
  ],
  messages: [
    {
      sender: Number,
      content: String,
      timestamp: Date
    }
  ]
});


module.exports = {
  communications_model: mongoose.model('chat', CommunicationsSchema),
}
