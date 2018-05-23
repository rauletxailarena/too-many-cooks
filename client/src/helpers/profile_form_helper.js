function profile_field_helper() {


  this.fill_profile_form = function(user, profile_fields, user_type_fields) {

    // fill in personal data
    this.fill_form_field(profile_fields.user_name_field, user.user_name)
    this.fill_form_field(profile_fields.first_name_field, user.first_name)
    this.fill_form_field(profile_fields.last_name_field, user.last_name)
    this.fill_form_field(profile_fields.email_field, user.email)
    this.fill_form_field(profile_fields.birthdate_field, user.date_of_birth)
    console.log("Personal data " + user.share_personal_data)
    if (user.share_personal_details === true) {
      profile_fields.share_details_checkbox.checked = true;
    }

    // fill in user_type
    this.check_user_type(user, user_type_fields)
  }

  this.fill_form_field = function(field, value) {
    console.log(field)
    console.log(value)
    if (value !== undefined) {
      field.value = value
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

}

module.exports = new profile_field_helper
