var requestHelper = require('./request_helper')
var field_helper = require('./field_helper')
var display_helper = require('./display_helper')
var profile_form_helper = require('./profile_form_helper')
var session_info = require('./session_info')
var profile_form_helper = require('./profile_form_helper')

var url = "https://rauletxailarena-eval-test.apigee.net/toomanycooks/api/v1/users"
var test_url = "https://localhost/api/v1/users"

var update_profile_button = function() {

  var button = document.getElementById("update-profile-button")

  button.addEventListener("click", function() {

    var user_to_register = profile_form_helper.getUserFromProfileFields()
    console.log("UpdatedUser", user_to_register)
    requestHelper.putRequestWithHeaders(test_url + "/" + user_to_register.id,
    [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
      JSON.stringify(user_to_register),
      function(status) {
        console.log("status", status)
      })
  })
}

module.exports = update_profile_button;
