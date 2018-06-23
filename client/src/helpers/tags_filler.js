var request_helper = require('./request_helper')

var url = "http://localhost:3002/api/v1/tags"

var append_elements = function(tags_array) {
  var tags_container = document.getElementById("create-event-tags-container");
  tags_array.forEach(function (tag) {

    var external_div= document.createElement("div");
    external_div.classList.add("tag-checkbox");

    var label = document.createElement("label");
    label.setAttribute("for", tag.title);
    label.innerText = tag.title;

    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("id", tag.title);
    checkbox.setAttribute("value", tag._id);

    external_div.appendChild(label);
    external_div.appendChild(checkbox);
    tags_container.appendChild(external_div)
  })
}

var tags_filler = {
  fill_tags: function () {
    request_helper.getRequestWithHeaders(
      url,
      [{"header": "x-apikey", "value": "gb49ALfq8gH2c32TxO7QB90Hr8aLjoqF"}, {"header": "Content-Type", "value": "application/json"}],
      null,
      function(res) {
        console.log(JSON.stringify(res))
        append_elements(res)
      })
  }
}

module.exports = tags_filler
