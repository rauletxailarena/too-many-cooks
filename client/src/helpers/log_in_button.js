var requestHelper = require('./request_helper')
var field_helper = require('./field_helper')
var profile_form_helper = require('./profile_form_helper')
var display_helper = require('./display_helper')
var session_info = require('./session_info')


var url = "https://rauletxailarena-eval-test.apigee.net/toomanycooks/api/v1/users"
var test_url = "http://localhost:3001/api/v1/users"

var log_in_button = function() {

  var button = document.getElementById("log-in-button")

  button.addEventListener("click", function() {


    // Grab all the elements

    var username = document.getElementById('log-in-input-username').value
    var password = document.getElementById('log-in-input-password').value
    var user_name_field = document.getElementById("profile-input-username")
    var first_name_field = document.getElementById("profile-input-first-name")
    var last_name_field = document.getElementById("profile-input-last-name")
    var email_field = document.getElementById("profile-input-email")
    var birthdate_field = document.getElementById("profile-input-birthdate")
    var share_details_checkbox = document.getElementById("profile-input-share-details")

    var profile_fields = {user_name_field, first_name_field, last_name_field, email_field, birthdate_field, share_details_checkbox}

    var user_type_chef = document.getElementById("user-type-chef")
    var user_type_student = document.getElementById("user-type-student")
    var user_type_both = document.getElementById("user-type-both")

    var user_type_radio_buttons = {user_type_chef, user_type_student, user_type_both}

    // Check no fields are left empty

    if (field_helper.is_field_empty(password) || field_helper.is_field_empty(username)) {
      document.getElementById("log-in-hint").innerHTML = "Make sure you don't leave any empty fields"
      return
    }


    // Grab username and password to prepare request

    var query_params = "?username=" + username + "&password=" + password


    // Request data using username and password

    requestHelper.getRequestWithHeaders(test_url,
      [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}],
      query_params,
      function(data) {
          if (data.length === 0 ){
            console.log("No user found")
            document.getElementById("log-in-hint").innerHTML = "Wrong username or password"
          } else {
            console.log(JSON.stringify(data))
            display_helper.show_div("profile-page-wrapper")
            display_helper.hide_div("welcome-page-wrapper")
            profile_form_helper.fill_profile_form(data[0], profile_fields, user_type_radio_buttons)
            session_info.user_id = data[0].id
          }
      })

  })
}

module.exports = log_in_button;
