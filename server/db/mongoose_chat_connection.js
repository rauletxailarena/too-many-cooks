var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/chats')

var ChatSchema = new mongoose.Schema({
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
  chat_model: mongoose.model('chat', ChatSchema),
}
