var requestHelper = require('./request_helper')
var field_helper = require('./field_helper')

// test
// var url = "localhost:3001/api/v1/users"

//prod
var url = "https://rauletxailarena-eval-test.apigee.net/toomanycooks/api/v1/users"

var log_in_button = function() {

  var button = document.getElementById("log-in-button")

  button.addEventListener("click", function() {

    var username = document.getElementById('log-in-input-username').value
    var password = document.getElementById('log-in-input-password').value

    if (field_helper.is_field_empty(password) || field_helper.is_field_empty(username)) {
      document.getElementById("log-in-hint").innerHTML = "Make sure you don't leave any empty fields"
      return
    }

    var query_params = "?username=" + username + "&password=" + password

    requestHelper.getRequestWithHeaders(url,
      [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}],
      query_params,
      function(data) {
          if (data.length === 0 ){
            console.log("No user found")
            document.getElementById("log-in-hint").innerHTML = "Wrong username or password"
          } else {
            console.log(JSON.stringify(data))
          }
      })

  })
}

module.exports = log_in_button;
