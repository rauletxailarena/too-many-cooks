var requestHelper = require('./request_helper')
var display_helper = require('./display_helper')
var session_info = require('./session_info')


var url = "https://rauletxailarena-eval-test.apigee.net/toomanycooks/api/v1/events"
var test_url = "http://localhost:3002/api/v1/events"

var create_event_button = function() {

  var button = document.getElementById("create-event-button")

  button.addEventListener("click", function() {

    var postcode = document.getElementById("event-postcode-input").value

    requestHelper.getRequestWithHeaders("http://api.postcodes.io/postcodes/" + postcode,
    null,
    null,
    function(data) {
      var event_to_create = construct_event()
      event_to_create.location.latitude = data.result.latitude;
      event_to_create.location.longitude = data.result.longitude;

      console.log(event_to_create)
      requestHelper.postRequestWithHeaders(
        test_url,
        [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
        JSON.stringify(event_to_create),
        function(result) {
          console.log(result)
        }
      )
      console.log(data)
    })
  })

  var construct_event = function() {

    var tag_ids = []

    document.getElementById('create-event-tags-container').childNodes.forEach(function(childNode) {
      for (i = 1; i < childNode.childNodes.length; i++) {
        if (childNode.childNodes[i].checked) {
          tag_object = {"_id":childNode.childNodes[i].value}
          tag_ids.push(tag_object);
        }
      }
    })

  // construct the datetime string

  var date_string = document.getElementById("event-date-input").value
  var time_string = document.getElementById("event-time-input").value
  var date_time = string = date_string + "T" + time_string

    var my_event = {
      "host_id": session_info.user_id,
      "title": document.getElementById("event-title-input").value,
      "description": document.getElementById("event-description-input").value,
      "type": document.getElementById("event-type-select").value,
      "image_url": document.getElementById("event-image-url-input").value,
      "start_date": date_string,
      "slots": document.getElementById("create-event-slot-picker").value,
      "tag_ids": tag_ids
    }

    var my_location = {
      "postcode": document.getElementById("event-postcode-input").value,
      "address": document.getElementById("event-address-input").value,
      "city": document.getElementById("event-city-input").value
    }

    var object_to_return = {
      "event": my_event,
      "location": my_location
    }


    return object_to_return
  }
}




module.exports = create_event_button;
