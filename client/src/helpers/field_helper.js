function field_helper() {

  this.is_field_empty = function(field_value) {
    var empty = false;
    if (field_value == null || field_value === "") {
      empty = true;
    }
    return empty
  }

  this.same_content = function (field1, field2) {
    var content1 = document.getElementById(field1).value
    var content2 = document.getElementById(field2).value
    console.log ("comparing " + content1 + " and " + content2)
    if(content1 === content2) {
      return true;
    }
  }
}

module.exports = new field_helper
