// requestHelper is a helper class that will be used to streamline the HTTP request
// outgoing from the app to the different services

var requestHelper = {}

requestHelper.getRequestWithHeaders = function (url, headerArray, query_params, callback) {
  var xhr = new XMLHttpRequest()
  if (query_params !== null) {
    url = url + query_params
  }
  xhr.open('GET', url)

  if (headerArray != null) {
    for (var headerObject of headerArray) {
      var header = headerObject.header
      var value = headerObject.value
      xhr.setRequestHeader(header, value)
    }
  }

  xhr.addEventListener('load', function () {
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data)
  })
  xhr.send()
}

requestHelper.postRequestWithHeaders = function (url, headerArray, payload, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)

  for (var headerObject of headerArray) {
    var header = headerObject.header
    var value = headerObject.value
    xhr.setRequestHeader(header, value)
  }

  xhr.addEventListener('load', function () {
    var status = xhr.status
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data, status)
  })
  xhr.send(payload)
}

requestHelper.putRequestWithHeaders = function (url, headerArray, payload, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('PUT', url)

  for (var headerObject of headerArray) {
    var header = headerObject.header
    var value = headerObject.value
    xhr.setRequestHeader(header, value)
  }

  xhr.addEventListener('load', function () {
    var status = xhr.status
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data, status)
  })
  xhr.send(payload)
}



module.exports = requestHelper
