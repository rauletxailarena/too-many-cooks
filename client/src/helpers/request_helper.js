var requestHelper = {}

requestHelper.getRequest = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('GET', url)

  xhr.addEventListener('load', function () {
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data)
  })

  xhr.send()
}

requestHelper.getRequest = function (url, callback) {
  this.getRequestWithHeaders(url, [], callback)
}

requestHelper.getRequestWithHeaders = function (url, headerArray, query_params, callback) {
  // console.log("Request Helper, Get Request With Headers, This is", this)
  var xhr = new XMLHttpRequest()
  if (query_params !== null) {
    url = url + query_params
  }
  xhr.open('GET', url)

  for (var headerObject of headerArray) {
    var header = headerObject.header
    var value = headerObject.value
    xhr.setRequestHeader(header, value)
  }

  xhr.addEventListener('load', function () {
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data)
  })

  xhr.send()
}

requestHelper.postRequestWithHeaders = function (url, headerArray, payload, callback) {
  // console.log("Request Helper, Get Request With Headers, This is", this)
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)

  for (var headerObject of headerArray) {
    var header = headerObject.header
    var value = headerObject.value
    xhr.setRequestHeader(header, value)
  }

  xhr.addEventListener('load', function () {
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data)
  })

  xhr.send(payload)
}


requestHelper.postRequest = function (url, callback, payload) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', url)

  xhr.addEventListener('load', function () {
    if (xhr.status !== 200) return
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data)
  })

  xhr.setRequestHeader('Content-Type', 'application/json')

  var jsonString = JSON.stringify(payload)
  xhr.send(jsonString)
}

        // requestHelper.deleteRequest(url, callback)

requestHelper.deleteRequest = function (url, callback) {
  var xhr = new XMLHttpRequest()
  xhr.open('DELETE', url)

  xhr.addEventListener('load', function () {
    // if (xhr.status !== 200) return
    var jsonString = xhr.responseText
    var data = JSON.parse(jsonString)
    callback(data)
  })

  // xhr.setRequestHeader('Content-Type', 'application/json')

  // var jsonString = JSON.stringify(payload)
  xhr.send("")
}


module.exports = requestHelper
