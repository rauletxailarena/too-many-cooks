var request_helper = require('./request_helper')
var url = "http://localhost:3002/api/v1/events"
var users_url = "http://localhost:3001/api/v1/users"
var session_info = require('./session_info')

var manage_events = {

  retrieve_event_info: function(event_id) {
    request_helper.getRequestWithHeaders(
      url + "?user_id=" + event_id,
      [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
      null,
      function(data) {
        manage_events.populate_upcoming_event_boxes(data)
      }
    )
  },

  retrieve_manage_events_info: function(host_id){
    request_helper.getRequestWithHeaders(
      url + "?host_id=" + host_id,
      [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
      null,
      function(data) {
        manage_events.populate_select_event_buttons(data)
      }
    )
  },

  populate_upcoming_event_boxes: function(events_list) {
    var event_found_container = document.getElementById("manage-events-events-found-wrapper")
    events_list.forEach(function(_event){

      //CREAT CONTAINER

      var container = document.createElement("div")
      container.classList.add("event-found-container")
      container.classList.add("bordered")
      // FIRST ROW

      // create row div
      var event_found_first_row = document.createElement("div")
      event_found_first_row.classList.add("event-found-first-row")

      // create image div
      var image_div = document.createElement("div")
      image_div.classList.add("event-found-first-row-item")

      // create image element
      var image = document.createElement("img")
      image.classList.add("event-found-first-row-item")
      image.setAttribute("src", _event.image_url)

      image_div.appendChild(image);

      // create title and descr div
      var title_and_desc_div = document.createElement("div")
      title_and_desc_div.classList.add("event-found-first-row-item")

      var title_div = document.createElement("div")
      title_div.classList.add("event-title")

      var description_div = document.createElement("div")
      description_div.classList.add("event-description")

      // create title element
      var title = document.createElement("h1")
      title.innerText = _event.title;

      // create description element
      var description = document.createElement("p")
      description.innerText = _event.description;

      title_div.appendChild(title)
      description_div.appendChild(description)
      title_and_desc_div.appendChild(title_div)
      title_and_desc_div.appendChild(description_div)

      // create status div
      var status_div = document.createElement("div")
      status_div.classList.add("event-status-wrapper-2")
      status_div.classList.add("event-found-first-row-item")
      status_div.classList.add("small-item")

      // create status label and element
      var status_label = document.createElement("label")
      status_label.setAttribute("for", "status-input-2")
      status_label.innerText = "Event status"

      var status = document.createElement("input")
      var status_number = _event.assistants.find(function(assistant) {
        return assistant.user_id == session_info.user_id
      })
      status_number = status_number.status
      var status_text = ""
      if (status_number == 1) {
        status_text = "Pending approval"
      } else {
        status_text = "Not accepted"
      }
      status.classList.add("status-input-2")
      status.setAttribute("value", status_text)
      status.setAttribute("type", "text")
      status.setAttribute("disabled", "true")

      status_div.appendChild(status_label)
      status_div.appendChild(status)


      // Put all together
      event_found_first_row.appendChild(image_div)
      event_found_first_row.appendChild(title_and_desc_div)
      event_found_first_row.appendChild(status_div)

      //SECOND ROW
      var event_found_second_row = document.createElement("div")
      event_found_second_row.classList.add("event-found-second-row")

      // date div
      var date_array = _event.start_date.split("T")[0].split("-")
      var date_string = date_array[2] + "/" + date_array[1] + "/" + date_array[0]
      var date_div = document.createElement("div")
      date_div.classList.add("event-found-second-row-item")
      var date_label = document.createElement("label")
      date_label.setAttribute("for", "event-date-field-2")
      date_label.innerText = "Event date"
      var date = document.createElement("input")
      date.classList.add("event-date-field-2")
      date.setAttribute("type", "text")
      date.setAttribute("disabled", "true")
      date.setAttribute("value", date_string)

      date_div.appendChild(date_label)
      date_div.appendChild(date)
      event_found_second_row.appendChild(date_div)

      // time div
      var time_array = _event.start_date.split("T")[1].split(":")
      var time_string = time_array[0] + ":" + time_array[1]
      var time_div = document.createElement("div")
      time_div.classList.add("event-found-second-row-item")
      var time_label = document.createElement("label")
      time_label.setAttribute("for", "event-time-field-2")
      time_label.innerText = "Event time"
      var time = document.createElement("input")
      time.classList.add("event-time-field-2")
      time.setAttribute("type", "text")
      time.setAttribute("disabled", "true")
      time.setAttribute("value", time_string)

      time_div.appendChild(time_label)
      time_div.appendChild(time)
      event_found_second_row.appendChild(time_div)

      // Available slots div
      var slots_div = document.createElement("div")
      slots_div.classList.add("event-found-second-row-item")
      var slots_label = document.createElement("label")
      slots_label.setAttribute("for", "event-available-spaces-field-2")
      slots_label.innerText = "Event slots"
      var slots = document.createElement("input")
      slots.classList.add("event-available-spaces-field-2")
      slots.setAttribute("type", "text")
      slots.setAttribute("disabled", "true")
      slots.setAttribute("value", _event.slots - _event.assistants.length)

      slots_div.appendChild(slots_label)
      slots_div.appendChild(slots)
      event_found_second_row.appendChild(slots_div)


      // Location div
      var location_div = document.createElement("div")
      location_div.classList.add("event-found-second-row-item")
      var location_label = document.createElement("label")
      location_label.setAttribute("for", "event-location-field-2")
      location_label.innerText = "Event location"
      var location = document.createElement("input")
      location.classList.add("event-location-field-2")
      location.setAttribute("type", "text")
      location.setAttribute("disabled", "true")
      location.setAttribute("value", _event.location_id.address)

      location_div.appendChild(location_label)
      location_div.appendChild(location)
      event_found_second_row.appendChild(location_div)

      // User div

      request_helper.getRequestWithHeaders(
        users_url + "/" + session_info.user_id,
        [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
        null,
        function(user_object) {
          // user div
          var user_div = document.createElement("div")
          user_div.classList.add("event-found-second-row-item")
          var user_label = document.createElement("label")
          user_label.setAttribute("for", "event-host-field-2")
          user_label.innerText = "Event user"
          var user = document.createElement("input")
          user.classList.add("event-host-field-2")
          user.setAttribute("type", "text")
          user.setAttribute("disabled", "true")
          user.setAttribute("value", user_object.first_name + " " + user_object.last_name)

          user_div.appendChild(user_label)
          user_div.appendChild(user)

          event_found_second_row.appendChild(user_div)
        }
      )
      container.appendChild(event_found_first_row)
      container.appendChild(event_found_second_row)

      event_found_container.appendChild(container)
    })

  },

  populate_select_event_buttons:function(events_list) {
    var general_container = document.getElementById("manage-my-events-container")
    var general_row = document.createElement("div")
    general_row.classList.add("manage-my-events-row")
    general_row.id = "manage-my-events-row"

    var row_item = document.createElement("div")
    general_row.appendChild(row_item)
    row_item.classList.add("manage-my-events-row-item")


    console.log("populate_select_event_buttons called");
    events_list.forEach(function(_event) {
      // createButton
      var button = document.createElement("button")
      button.id = _event._id
      button.innerText = _event.title

      // add onClick method to button
      button.addEventListener("click", function() {
        request_helper.getRequestWithHeaders(
          url + "/" + _event._id,
          [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
          null,
          function(data) {
            console.log("button clicked");
            manage_events.populate_user_management(data)
          }
        )
      })

      // append button to DOM
      var button_div = document.createElement("div")

      button_div.classList.add("manage-my-events-row-item")
      button_div.appendChild(button)
      row_item.appendChild(button_div)
      general_container.appendChild(general_row)
    })

  },

  populate_user_management: function(_event) {

    var users_going = _event.assistants.filter(function(assistant) {
      return assistant.status === 2;
    })
    var users_pending_approval = _event.assistants.filter(function(assistant) {
      return assistant.status === 1;
    })

    console.log(users_going);
    manage_events.populate_going_element(users_going)

    console.log(users_pending_approval);
    manage_events.populate_pending_element(users_pending_approval)

    manage_events.create_management_buttons(_event)
  },

  populate_going_element: function(users_array) {
    var row = document.getElementById("manage-my-events-row")
    var row_item = document.createElement("div")
    row.appendChild(row_item)
    row_item.classList.add("manage-my-events-row-item")
    var title = document.createElement("h4")
    title.innerText= "Going"
    row_item.appendChild(title)
    users_array.forEach(function (user) {
      request_helper.getRequestWithHeaders(
        "http://localhost:3001/api/v1/users/" + user.user_id,
        [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
        null,
        function(user_object) {
          console.log(user_object);
          var user_input = document.createElement("input")
          user_input.setAttribute("id", "going-field-" +user_object.id)
          user_input.setAttribute("disabled", "true")
          user_input.setAttribute("value", user_object.first_name + " " + user_object.last_name)
          row_item.appendChild(user_input)
        }
      )
    })
  },

  populate_pending_element: function(users_array) {
    var row = document.getElementById("manage-my-events-row")
    var row_item = document.createElement("div")
    row.appendChild(row_item)
    row_item.classList.add("manage-my-events-row-item")

    var title = document.createElement("h4")
    title.innerText= "Pending approval"
    row_item.appendChild(title)

    var select = document.createElement("select")
    select.id = "manage-events-user-selected"
    row_item.appendChild(select)
    users_array.forEach(function (user) {
      request_helper.getRequestWithHeaders(
        "http://localhost:3001/api/v1/users/" + user.user_id,
        [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
        null,
        function(user_object) {
          var user_option = document.createElement("option")
          user_option.setAttribute("value", user_object.id)
          user_option.innerText = user_object.first_name + " " + user_object.last_name
          select.appendChild(user_option)
        }
      )
    })
  },
  create_management_buttons: function(_event) {
    var row = document.getElementById("manage-my-events-row")
    var row_item = document.createElement("div")
    row.appendChild(row_item)
    row_item.classList.add("manage-my-events-row-item")

    // create accept button
    var accept_div = document.createElement("div")
    row_item.appendChild(accept_div)
    accept_div.classList.add("manage-my-events-row-item")

    var accept_button = document.createElement("button")
    accept_button.id = "accept-guest-button"
    accept_button.innerText = "Accept"
    accept_button.addEventListener("click", function(){
      var user_selected_id = document.getElementById("manage-events-user-selected").value
      request_helper.putRequestWithHeaders(
        url + "/" + _event._id + "/users/" + user_selected_id,
        [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
        JSON.stringify({"status": 2}),
        function(result) {
          console.log(result)
        }
      )
    })

    accept_div.append(accept_button)
    row_item.appendChild(accept_div)

    // create reject button
    var reject_div = document.createElement("div")
    row_item.appendChild(reject_div)
    reject_div.classList.add("manage-my-events-row-item")

    var reject_button = document.createElement("button")
    reject_button.id = "reject-guest-button"
    reject_button.innerText = "Reject"
    reject_button.addEventListener("click", function(_event) {

    })


    reject_div.append(reject_button)
    row_item.appendChild(reject_div)
  }

}

module.exports = manage_events
