var display_helper = require("./display_helper")
var tags_filler = require("./tags_filler.js")
var manage_events_helper = require("./manage_events.js")
var session_info = require('./session_info')

var navbar_links = function() {

  var customise_profile=  document.getElementById("customise-profie-nav-link");
  var manage_events= document.getElementById("manage-events-nav-link");
  var create_event= document.getElementById("create-event-nav-link");
  var search_event= document.getElementById("search-event-nav-link");

  customise_profile.addEventListener("click", function() {
    display_helper.show_only("profile-page-wrapper")
  });

  manage_events.addEventListener("click", function() {
    display_helper.show_only("manage-events-page-wrapper")
    manage_events_helper.retrieve_event_info(session_info.user_id)
    manage_events_helper.retrieve_manage_events_info(session_info.user_id)
  });

  create_event.addEventListener("click", function() {
    display_helper.show_only("create-event-page-wrapper")
    tags_filler.fill_tags();
  });

  search_event.addEventListener("click", function() {
    display_helper.show_only("search-events-page-wrapper")
  });

}

module.exports = navbar_links;
