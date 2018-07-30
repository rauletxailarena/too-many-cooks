var models = require('./mongoose_chat_connection')
var delay = require('delay')

models.chat_model.collection.drop()



  models.chat_model.create({
    "participants": [
      {
        user_id: 1
      },
      {
        user_id: 2
      },
      {
        user_id: 3
      }
    ],
    "messages":
    [
      {
        sender: 1,
        content: "Hey, could you please let me know if there will be vegetarian options in your event?",
        timestamp: new Date('2018-12-17')
      },
      {
        sender: 2,
        content: "Yes, there will be vegetarian Pakora!",
        timestamp: new Date('2018-12-17')
      },
      {
        sender: 3,
        content: "Perfect, can I bring a friend along with me??",
        timestamp: new Date('2018-12-17')
      },
    ]
  })
