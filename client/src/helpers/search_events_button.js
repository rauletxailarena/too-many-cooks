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

var search_events_button = function() {

  var button = document.getElementById("search-button");

  button.addEventListener("click", function( ) {
    console.log("search events button clicked")

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
          }
        )
      })
  })
}



module.exports = search_events_button;
