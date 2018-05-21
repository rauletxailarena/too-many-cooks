function field_helper() {

  this.is_field_empty = function(field_value) {
    var empty = false;
    if (field_value == null || field_value === "") {
      empty = true;
    }
    return empty
  }
}

module.exports = new field_helper
