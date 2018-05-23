var requestHelper = require('./request_helper')
var field_helper = require('./field_helper')
var display_helper = require('./display_helper')
var profile_form_helper = require('./profile_form_helper')
var session_info = require('./session_info')

var url = "https://rauletxailarena-eval-test.apigee.net/toomanycooks/api/v1/users"

var update_profile_button = function() {

  var button = document.getElementById("update-profile-button")

  button.addEventListener("click", function() {


    // Grab all the fields

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

    // Create user to store

    // var user_to_register = {
    //   "first_name" : null,
    //   "last_name" : null,
    //   "email": null,
    //   "password": null,
    //   "date_of_birth": null
    // }

    // requestHelper.postRequestWithHeaders(url,
    //   [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
    //   JSON.stringify(user_to_register),
    //   function(data, status) {
    //     console.log(JSON.stringify(status))
    //     console.log(JSON.stringify(data))
    //     if ("id" in data) {
    //     }
    //   })

    console.log(session_info.user_id)
  })
}

module.exports = update_profile_button;
