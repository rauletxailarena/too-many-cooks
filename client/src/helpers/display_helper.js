function display_helper() {

  this.hide_div = function(div_id) {
    var div = document.getElementById(div_id)
    div.style.display = "none"
  }

  this.show_div = function(div_id) {
    var div = document.getElementById(div_id)
    div.style.display = "visible"
  }
}

module.exports = new display_helper
