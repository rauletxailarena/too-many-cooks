function display_helper() {

  // this.hide_div = function(div_id) {
  //   var div = document.getElementById(div_id)
  //   div.style.visibility = "hidden"
  // }

  this.hide_div = function(div_id) {
    var div = document.getElementById(div_id)
    div.style.display = "none"
  }

  this.show_div = function(div_id) {
    var div = document.getElementById(div_id)
    div.style.display = "initial"
  }

  this.show_only = function(div_id) {
    var wrappers = []
    var welcome_page_wrapper = wrappers.push(document.getElementById("welcome-page-wrapper"));
    var profile_page_wrapper = wrappers.push(document.getElementById("profile-page-wrapper"));
    var create_event_page_wrapper = wrappers.push(document.getElementById("create-event-page-wrapper"));
    var manage_events_page_wrapper = wrappers.push(document.getElementById("manage-events-page-wrapper"));
    var search_events_page_wrapper = wrappers.push(document.getElementById("search-events-page-wrapper"));
    var communications_page_wrapper = wrappers.push(document.getElementById("chats-page-wrapper"));

    wrappers.forEach(function(event) {
      if (event.id === div_id) {
        event.style.display = "initial"
      } else {
        event.style.display = "none"
      }
    })
  }

}

module.exports = new display_helper
