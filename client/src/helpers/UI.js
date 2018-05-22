var sign_up_button = require("./sign_up_button.js")
var log_in_button = require("./log_in_button.js")
var display_helper = require("./display_helper")

var UI = function(){

  this.sign_up_button = new sign_up_button()
  this.log_in_button = new log_in_button()
  display_helper.hide_div("profile-page-wrapper")
}


module.exports = UI;
