var requestHelper = require('./request_helper')
var field_helper = require('./field_helper')

var sign_up_button = function() {

  var button = document.getElementById("sign-up-button")

  button.addEventListener("click", function() {

    console.log("Button clicked")

    var email = document.getElementById('sign-up-input-email').value
    var password = document.getElementById('sign-up-input-password').value
    var username = document.getElementById('sign-up-input-username').value

    if (field_helper.is_field_empty(email) || field_helper.is_field_empty(password) || field_helper.is_field_empty(username)) {
      document.getElementById("sign-up-hint").innerHTML = "Make sure you don't leave any empty fields"
      return
    }

    var user_to_register = {
      "first_name" : null,
      "last_name" : null,
      "email": email,
      "password": password,
      "date_of_birth": null
    }

    requestHelper.postRequestWithHeaders("https://rauletxailarena-eval-test.apigee.net/toomanycooks/api/v1/users",
      [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
      JSON.stringify(user_to_register),
      function(data) {
        console.log(JSON.stringify(data))
      })
  })
}

module.exports = sign_up_button;
