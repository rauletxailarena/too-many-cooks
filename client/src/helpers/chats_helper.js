var request_helper = require('./request_helper')
var session_info = require('./session_info')

var communications_url="http://localhost:3003/api/v1/communications"
var users_url="http://localhost:3001/api/v1/users/"
var request_header = [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"},
{"header": "Content-Type", "value": "application/json"}]

var chats_helper = {

  create_chat_entry: function(user_name, message) {
    var container = document.getElementById("chat-messages-wrapper")

    var wrapper = document.createElement("DIV")
    wrapper.classList.add("input-group")
    wrapper.classList.add("mb-3")

    var input_group = document.createElement("DIV")
    input_group.classList.add("input-group-append")

    var span = document.createElement("SPAN")
    span.classList.add("input-group-text")
    span.appendChild(document.createTextNode( user_name + " said:"));

    var input = document.createElement("input")
    input.setAttribute("type", "text")
    input.classList.add("form-control")
    input.setAttribute("value", message)
    input.setAttribute("disabled", true)

    wrapper.appendChild(input_group)
    wrapper.appendChild(input)
    input_group.appendChild(span)
    container.appendChild(wrapper)
  },

  create_reply_element : function(chat_id) {
    var wrapper = document.getElementById("chat-reply-wrapper")

    var container = document.createElement("DIV")
    container.classList.add("input-group")
    container.classList.add("mb-3")

    var input = document.createElement("INPUT")
    input.classList.add("form-control")
    input.setAttribute("type", "text")
    input.id = "reply-message-field"

    var button_div = document.createElement("DIV")
    button_div.classList.add("input-group-append")

    var button = document.createElement("BUTTON")
    button.classList.add("btn")
    button.classList.add("btn-default")
    button.setAttribute("type", "button")
    button.id = "reply-button"
    button.addEventListener("click", function() {
      var payload = {
	      "message": {
		      "sender": session_info.user_id,
		      "content": document.getElementById("reply-message-field").value
        }
	    }
      console.log("About to add a message to chat: ", chat_id)
      request_helper.postRequestWithHeaders(
        communications_url + "/" + chat_id,
        request_header,
        JSON.stringify(payload),
        function(data) {
          console.log("Object returned: ", data)
        }
      )
    })
    button.appendChild(document.createTextNode("Reply"))


    button_div.appendChild(button)
    container.appendChild(input)
    container.appendChild(button_div)
    wrapper.appendChild(container)
  },

  show_chats: function() {
    request_helper.getRequestWithHeaders(
      communications_url + "/user/" + session_info.user_id,
      request_header,
      null,
      function (communication_data) {
        communication_data[0].messages.forEach(function(message) {
          request_helper.getRequestWithHeaders(
            users_url + message.sender,
            request_header,
            null,
            function(user_data) {
              chats_helper.create_chat_entry(user_data.first_name, message.content)
            }
          )
        })
        chats_helper.create_reply_element(communication_data[0]._id)
      }
    )
  },

  display_users: function() {
    var chat_select = document.getElementById("start-new-chat-select")
    request_helper.getRequestWithHeaders(
      users_url,
      request_header,
      null,
      function (users_data) {
        users_data.forEach(function(user) {
          var option = document.createElement("OPTION")
          option.setAttribute("value", user.id)
          option.appendChild(document.createTextNode(user.first_name + " " + user.last_name))
          chat_select.appendChild(option)
          var button = document.getElementById("start-new-chat-button");
          button.addEventListener("click", chats_helper.start_new_chat)
        })
    })
  },
  start_new_chat: function() {
    var receiver_id = document.getElementById("start-new-chat-select").value
    var payload = {
      "user_id": parseInt(session_info.user_id),
      "receiver_id": parseInt(receiver_id)
    }
    console.log(payload)
    request_helper.postRequestWithHeaders(
      communications_url,
      request_header,
      JSON.stringify(payload),
      function(data) {
        console.log("Object returned: ", data)
      }
    )
  }

}

module.exports = chats_helper
