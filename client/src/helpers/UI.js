var sign_up_button = require("./sign_up_button.js")
var log_in_button = require("./log_in_button.js")
var update_profile_button = require("./update_profile_button")
var display_helper = require("./display_helper.js")
var profile_form_helper = require("./profile_form_helper.js")
var navbar_links = require("./navbar_links.js")
var create_event_button = require("./create_event_button.js")
var manage_events = require("./manage_events.js")

var UI = function(){
  this.sign_up_button = new sign_up_button()
  this.log_in_button = new log_in_button()
  this.update_profile_button = new update_profile_button()
  this.navbar_links = new navbar_links()
  this.create_event_button = new create_event_button()
}


module.exports = UI;
