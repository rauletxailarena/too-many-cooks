var request_helper = require('./request_helper')
var url = "http://localhost:3002/api/v1/events"
var users_url = "http://localhost:3001/api/v1/users"
var session_info = require('./session_info')

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
          check_boxes_values.push(childNode)
          console.log(childNode)
        }
      })
    })

    console.log("postcode", postcode)
    console.log("distance", distance)
    console.log("from_date", from_date)
    console.log("to_date", to_date)
    console.log("check_boxes", check_boxes_values)
  })

}



module.exports = search_events_button;
