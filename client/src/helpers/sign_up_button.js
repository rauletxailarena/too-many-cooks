var requestHelper = require('./request_helper')
var field_helper = require('./field_helper')
var display_helper = require('./display_helper')
var profile_form_helper = require('./profile_form_helper')

var url = "https://rauletxailarena-eval-test.apigee.net/toomanycooks/api/v1/users"

var sign_up_button = function() {

  var button = document.getElementById("sign-up-button")

  button.addEventListener("click", function() {


    // Grab all the fields

    var email = document.getElementById('sign-up-input-email').value
    var password = document.getElementById('sign-up-input-password').value
    var username = document.getElementById('sign-up-input-username').value
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


    // Check no field is left emtpy

    if (field_helper.is_field_empty(email) || field_helper.is_field_empty(password) || field_helper.is_field_empty(username)) {
      document.getElementById("sign-up-hint").innerHTML = "Make sure you don't leave any empty fields"
      return
    }

    // Check both passwords match

    if (!(field_helper.same_content("sign-up-input-password", "sign-up-input-password-2"))) {
      document.getElementById("sign-up-hint").innerHTML = "The passwords don't match"
      return
    }


    // Create user to store

    var user_to_register = {
      "first_name" : null,
      "last_name" : null,
      "email": email,
      "password": password,
      "date_of_birth": null
    }

    requestHelper.postRequestWithHeaders(url,
      [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
      JSON.stringify(user_to_register),
      function(data, status) {
        console.log(JSON.stringify(status))
        console.log(JSON.stringify(data))
        if ("id" in data) {
          display_helper.hide_div("welcome-page-wrapper")
          display_helper.show_div("profile-page-wrapper")
          profile_form_helper.fill_profile_form(data, profile_fields, user_type_radio_buttons)
        }
      })
  })
}

module.exports = sign_up_button;
