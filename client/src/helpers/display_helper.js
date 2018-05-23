function display_helper() {

  this.hide_div = function(div_id) {
    var div = document.getElementById(div_id)
    div.style.visibility = "hidden"
  }

  this.show_div = function(div_id) {
    var div = document.getElementById(div_id)
    div.style.visibility = "visible"
  }

}

module.exports = new display_helper
