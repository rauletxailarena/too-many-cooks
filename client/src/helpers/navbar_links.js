var display_helper = require("./display_helper")
var tags_filler = require("./tags_filler.js")
var manage_events_helper = require("./manage_events.js")
var session_info = require('./session_info')
var chats_helper = require('./chats_helper')

var navbar_links = function() {

  var customise_profile= document.getElementById("customise-profie-nav-link");
  var manage_events= document.getElementById("manage-events-nav-link");
  var create_event= document.getElementById("create-event-nav-link");
  var search_event= document.getElementById("search-event-nav-link");
  var home = document.getElementById("home-nav-link")
  var too_many_cooks = document.getElementById("too-many-cooks-nav-link")
  var communications = document.getElementById("communications-nav-link")
  var gotosearchevents = document.getElementById("search-for-events-button")

  too_many_cooks.addEventListener("click", function() {
    console.log(session_info.user_id)
  })

  home.addEventListener("click", function() {
    console.log("Home clicked")
    display_helper.show_only("welcome-page-wrapper")
  })

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
  communications.addEventListener("click", function() {
    chats_helper.show_chats()
    display_helper.show_only("chats-page-wrapper")
    chats_helper.display_users()
  });

  gotosearchevents.addEventListener("click", function() {
    display_helper.show_only("search-events-page-wrapper")
  })

}

module.exports = navbar_links;
