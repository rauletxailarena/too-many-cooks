var session_info = require("./session_info.js")
var request_helper = require("./request_helper.js")
var interests_test_url = "http://localhost:3001/api/v1/interests"
var users_interests_test_url = "http://localhost:3001/api/v1/users/"

function profile_field_helper() {


  this.fill_profile_form = function(user, profile_fields, user_type_fields) {

    // fill in personal data
    this.fill_form_field(profile_fields.user_name_field, user.user_name)
    this.fill_form_field(profile_fields.first_name_field, user.first_name)
    this.fill_form_field(profile_fields.last_name_field, user.last_name)
    this.fill_form_field(profile_fields.email_field, user.email)
    this.fill_form_date_field(profile_fields.birthdate_field, user.date_of_birth)
    console.log("Personal data " + user.share_personal_data)
    if (user.share_personal_details === true) {
      profile_fields.share_details_checkbox.checked = true;
    }

    // fill in user_type
    this.check_user_type(user, user_type_fields)
    this.getAllInterests()
  }

  this.fill_form_field = function(field, value) {
    if (value !== undefined) {
      field.value = value
    }
  }

  this.fill_form_date_field = function(field, value) {
    var dateTime = new Date(value)
    var year = dateTime.getFullYear().toString()
    var month = (dateTime.getMonth() + 1).toString()
    if (month.length === 1) {
      month = "0" + month.toString()
    }

    var day = dateTime.getUTCDate().toString()
    if (day.length === 1) {
      console.log("dayLenth", day.length)
      console.log("day", day)
      day = "0" + day.toString()
    }

    var targetDate = year.toString() + "-" + month.toString() + "-" + day.toString()
    console.log(targetDate)
    if (value !== undefined) {
      field.value = targetDate
    }
  }

  this.check_user_type = function(user, user_type_fields) {
    console.log(user_type_fields)
    var user_type = user.user_type;
    console.log(user_type)
    switch (user_type) {
      case 1:
        user_type_fields.user_type_chef.checked = "checked"
        console.log("User type 1")
        break;
      case 2:
        user_type_fields.user_type_student.checked = "checked"
        console.log("User type 2")
        break;
      case 3:
        user_type_fields.user_type_both.checked = "checked"
        console.log("User type 3")
        break;
    }
  }

  this.getAllInterests = function() {
    request_helper.getRequestWithHeaders(interests_test_url,
      [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}],
      null,
      function(data) {
          if (data.length === 0 ){
            console.log("No interests found")
          } else {
            var interestsList = []
            data.forEach(function(interest) {
              interestsList.push(interest)
            })
            this.populateInterests(interestsList)
          }
      }.bind(this))
  }

  this.populateInterests = function(interestsList) {
    var htmlWrapper = document.getElementById("interest-wrapper")
    this.getUserInterests(function (userInterestsIds) {

      console.log("result from callback", userInterestsIds)

      interestsList.forEach(function(interest) {
        var checkBox = document.createElement('input');
        checkBox.type = 'checkbox';
        checkBox.name = interest.title;
        checkBox.value = interest.id;
        checkBox.id = "interest-check-box-" + interest.id;

        if (userInterestsIds.indexOf(interest.id) > -1) {
          console.log("Match found", interest.id)
          checkBox.checked = "checked"
        }

        var label = document.createElement('label')
        label.htmlFor = "interest-check-box-" + interest.id;
        label.appendChild(document.createTextNode(interest.title));

        htmlWrapper.appendChild(checkBox);
        htmlWrapper.appendChild(label);
      })

    })


  }

  this.getUserInterests = function(callback) {
    request_helper.getRequestWithHeaders(users_interests_test_url + session_info.user_id + "/interests",
      [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}],
      null,
      function(data) {
          if (data.length === 0 ){
            console.log("No interests found")
            callback ([])
          } else {
            var userInterestsIds = []
            data.forEach(function(interest) {
            userInterestsIds.push(interest.id)
            })
            console.log("data", data)
            console.log("user Interes id list:", userInterestsIds)
            callback( userInterestsIds )
          }
      })
  }

  this.getUserFromProfileFields = function() {
    var userToReturn = {}
    userToReturn.id = session_info.user_id
    userToReturn.user_name = document.getElementById("profile-input-username").value
    userToReturn.first_name = document.getElementById("profile-input-first-name").value
    userToReturn.last_name = document.getElementById("profile-input-last-name").value
    userToReturn.email = document.getElementById("profile-input-email").value
    userToReturn.date_of_birth = this.convertDate(document.getElementById("profile-input-birthdate").value)
    userToReturn.share_personal_details = document.getElementById("profile-input-share-details").checked

    return userToReturn

  }

  this.convertDate = function(date) {
    var dateArray = date.split("-")
    return dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0]
  }

}

module.exports = new profile_field_helper
