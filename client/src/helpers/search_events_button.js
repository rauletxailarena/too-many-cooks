var request_helper = require('./request_helper')
var url = "http://localhost:3002/api/v1/events"
var users_url = "http://localhost:3001/api/v1/users"
var postcodes_url = "http://api.postcodes.io/postcodes"
var session_info = require('./session_info')
var search_helper = require('./search.js')

var request_header = [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}]


var events_adapter = function(events_list_from_db) {
  var new_events_list = []
  events_list_from_db.forEach(function(item) {
    var tag_titles_list = []
    item.tags.forEach(function(tag_object) {
      tag_titles_list.push(tag_object.title)
    })
    delete item.tags
    item["tags"] = tag_titles_list
    new_events_list.push(item)
  })
  return new_events_list;
}

var display_events_found = function(list_of_events) {
  // Grab container element
  var container = document.getElementById("event-found-container")

  list_of_events.forEach(function(event) {
    // create individual event wrapper
    var event_found_container = document.createElement("DIV")
    event_found_container.classList.add("event-found-container")
    event_found_container.classList.add("bordered")

    // FIRST ROW
    // create individual event first row
    var event_found_first_row = document.createElement("DIV")
    event_found_first_row.classList.add("event-found-first-row")

    // create individual event first row item
    var event_found_first_row_item = document.createElement("DIV")
    event_found_first_row_item.classList.add("event-found-first-row-item")

    // create image for event found
    var event_found_image = document.createElement("IMG")
    event_found_image.setAttribute("src", event.image_url)

    // create second individual event first row item
    var event_found_first_row_item_2 = document.createElement("DIV")
    event_found_first_row_item_2.classList.add("event-found-first-row-item")

    // create event title div
    var event_found_title_div = document.createElement("DIV")
    event_found_title_div.classList.add("event-title")

    // create event title
    var event_found_title = document.createElement("H1")
    event_found_title.appendChild(document.createTextNode(event.title));

    // create event description div
    var event_found_description_div = document.createElement("DIV")
    event_found_description_div.classList.add("event-description")

    // create event description
    var event_found_description = document.createElement("P")
    event_found_description.appendChild(document.createTextNode(event.description));

    // create sign up button div
    var sign_up_button_div = document.createElement("DIV")
    sign_up_button_div.classList.add("event-found-first-row-item")
    sign_up_button_div.classList.add("small-item")

    // create sign up button
    var sign_up_button = document.createElement("button")
    sign_up_button.setAttribute("type", "button")
    sign_up_button.setAttribute("id", event._id)
    sign_up_button.appendChild(document.createTextNode("Sign up!"));

    sign_up_button.addEventListener("click", function() {
      console.log("button pressed: ", event._id)
      request_helper.postRequestWithHeaders(
        url + "/" + event._id + "/users/" + session_info.user_id,
        request_header,
        null,
        function(data) {
          console.log(data)
        }

      )
    })

    // SECOND ROW

    // create individual event second row
    var event_found_second_row = document.createElement("DIV")
    event_found_second_row.classList.add("event-found-second-row")

    // create individual event second row item
    var event_found_second_row_item = document.createElement("DIV")
    event_found_second_row_item.classList.add("event-found-second-row-item")

    // create label for date
    var label_date = document.createElement("LABEL")
    label_date.setAttribute("for", "event_date-field" + event._id);
    label_date.appendChild(document.createTextNode("Event date"));

    // create date input
    var date_field = document.createElement("INPUT")
    date_field.setAttribute("type", "text");
    date_field.setAttribute("disabled", "true");
    date_field.setAttribute("value", event.start_date.split("T")[0]);
    date_field.id = "event-date-field" + event._id

    // create individual event second row item number 2
    var event_found_second_row_item_2 = document.createElement("DIV")
    event_found_second_row_item_2.classList.add("event-found-second-row-item")

    // create label for hour
    var label_hour = document.createElement("LABEL")
    label_hour.setAttribute("for", "event-time-field" + event._id);
    label_hour.appendChild(document.createTextNode("Event time"));

    // create hour input
    var hour_field = document.createElement("INPUT")
    hour_field.setAttribute("type", "text");
    hour_field.setAttribute("disabled", "true");
    hour_field.setAttribute("value", event.start_date.split("T")[1]);
    hour_field.id = "event-time-field" + event._id

    // create individual event second row item number 3
    var event_found_second_row_item_3 = document.createElement("DIV")
    event_found_second_row_item_3.classList.add("event-found-second-row-item")

    // create label for hour
    var label_avaiable_spaces = document.createElement("LABEL")
    label_avaiable_spaces.setAttribute("for", "event-available-spaces-field" + event._id);
    label_avaiable_spaces.appendChild(document.createTextNode("Available spaces"));

    // create hour input
    var avaiable_spaces_field = document.createElement("INPUT")
    avaiable_spaces_field.setAttribute("type", "text");
    avaiable_spaces_field.setAttribute("disabled", "true");
    avaiable_spaces_field.setAttribute("value", event.slots);
    avaiable_spaces_field.id = "event-available-spaces-field" + event._id

    // create individual event second row item number 4
    var event_found_second_row_item_4 = document.createElement("DIV")
    event_found_second_row_item_4.classList.add("event-found-second-row-item")

    // create label for hour
    var label_location = document.createElement("LABEL")
    label_location.setAttribute("for", "event-location-field" + event._id);
    label_location.appendChild(document.createTextNode("Location"));

    // create hour input
    var location_field = document.createElement("INPUT")
    location_field.setAttribute("type", "text");
    location_field.setAttribute("disabled", "true");
    location_field.setAttribute("value", event.location_id.address);
    location_field.id = "event-location-field" + event._id

    // get host name
    request_helper.getRequestWithHeaders(
      users_url + "/" + event.host_id,
      request_header,
      null,
      function(data) {
        console.log(data.first_name, data.last_name)

        // create individual event second row item number 5
        var event_found_second_row_item_5 = document.createElement("DIV")
        event_found_second_row_item_5.classList.add("event-found-second-row-item")

        // create label for host
        var label_host = document.createElement("LABEL")
        label_host.setAttribute("for", "event-host-field" + event._id);
        label_host.appendChild(document.createTextNode("Host"));

        // create host input
        var host_field = document.createElement("INPUT")
        host_field.setAttribute("type", "text");
        host_field.setAttribute("disabled", "true");
        host_field.setAttribute("value", data.first_name + " " + data.last_name);
        host_field.id = "event-host-field" + event._id

        event_found_second_row.appendChild(event_found_second_row_item_5)
        event_found_second_row_item_5.appendChild(label_host)
        event_found_second_row_item_5.appendChild(host_field)
      }
    )



    // appending elements
    container.appendChild(event_found_container)
    event_found_container.appendChild(event_found_first_row)
    event_found_first_row.appendChild(event_found_first_row_item)
    event_found_first_row_item.appendChild(event_found_image)

    // append title and description
    event_found_first_row.appendChild(event_found_first_row_item_2)
    event_found_first_row_item_2.appendChild(event_found_title_div)
    event_found_title_div.appendChild(event_found_title)
    event_found_first_row_item_2.appendChild(event_found_description_div)
    event_found_description_div.appendChild(event_found_description)

    // append button
    event_found_first_row.appendChild(sign_up_button_div)
    sign_up_button_div.appendChild(sign_up_button)

    // append second row
    event_found_container.appendChild(event_found_second_row)

    // append date field
    event_found_second_row.appendChild(event_found_second_row_item)
    event_found_second_row_item.appendChild(label_date)
    event_found_second_row_item.appendChild(date_field)

    // append hour field
    event_found_second_row.appendChild(event_found_second_row_item_2)
    event_found_second_row_item_2.appendChild(label_hour)
    event_found_second_row_item_2.appendChild(hour_field)

    // append available slots field
    event_found_second_row.appendChild(event_found_second_row_item_3)
    event_found_second_row_item_3.appendChild(label_avaiable_spaces)
    event_found_second_row_item_3.appendChild(avaiable_spaces_field)

    // append location field
    event_found_second_row.appendChild(event_found_second_row_item_4)
    event_found_second_row_item_4.appendChild(label_location)
    event_found_second_row_item_4.appendChild(location_field)
  })
}

var search_events_button = function() {

  var button = document.getElementById("search-button");

  button.addEventListener("click", function( ) {

    var postcode = document.getElementById("postcode-search").value
    var distance = document.getElementById("distance-slider").value
    var from_date = document.getElementById("search-date-box-from-date").value
    var to_date = document.getElementById("search-date-box-to-date").value
    var check_boxes = Array.from(document.getElementsByClassName("tag-checkbox"))
    var check_boxes_values = []
    check_boxes.forEach(function(checkbox_div) {
      checkbox_div.childNodes.forEach(function(childNode) {
        console.log(childNode.nodeName)
        if (childNode.nodeName == "INPUT" && childNode.checked) {
          check_boxes_values.push(childNode.id)
          console.log(childNode)
        }
      })
    })

    console.log("postcode", postcode)
    console.log("distance", distance)
    console.log("from_date", from_date)
    console.log("to_date", to_date)
    console.log("check_boxes", check_boxes_values)

    request_helper.getRequestWithHeaders(
      url,
      request_header,
      null,
      function(events_list) {
        console.log("events before filtering", events_list)
        var adapted_data = events_adapter(events_list)
        request_helper.getRequestWithHeaders(
          postcodes_url + "/" + postcode,
          null,
          null,
          function(data) {
            target_coordinates = {}
            target_coordinates["latitude"] = data.result.latitude
            target_coordinates["longitude"] = data.result.longitude
            var filtered_by_tags = null
            if (check_boxes_values.length > 0) {
              filtered_by_tags = check_boxes_values
            }
            var found_events = search_helper(adapted_data,
              from_date,
              to_date,
              filtered_by_tags,
              target_coordinates,
              50
            )
            console.log("Events found", found_events)
            display_events_found(found_events)
          }
        )
      })
  })
}



module.exports = search_events_button;
