var events = [
    {
        "id": 1,
        "host_id": 1,
        "location_id": 1,
        "title": "Learn how to cook tapas with Pancho",
        "description": "A workshop in which our Spanish chef will introduce you into the tapas world",
        "type": 1,
        "start_date": "2018-06-12T23:00:00.000Z",
        "slots": 10,
        "tags": ["Beer"],
        "location_id": {
          "latitude": 55.943743,
          "longitude": -3.223609
        }
    },
    {
        "id": 2,
        "host_id": 2,
        "location_id": 2,
        "title": "Night out with beer tasting",
        "description": "We will learn how to appreciate different beer ingredients and flavours",
        "type": 1,
        "start_date": "2011-06-12T23:00:00.000Z",
        "slots": 10,
        "tags": ["Beer"],
        "location_id": {
          "latitude": 55.923743,
          "longitude": -3.221609
        }
    },
    {
        "id": 3,
        "host_id": 3,
        "location_id": 3,
        "title": "Steak feast masterclass",
        "description": "Rare, medium-rare or medium-well. However you like your steaks, this is your event",
        "type": 1,
        "start_date": "2016-06-12T23:00:00.000Z",
        "slots": 6,
        "tags": ["Beer", "Cupcake"],
        "location_id": {
          "latitude": 55.911743,
          "longitude": -3.217609
        }
    },
    {
        "id": 4,
        "host_id": 4,
        "location_id": 4,
        "title": "Cupcake competition",
        "description": "Come with your cupcakes ready to take part in this fun competition",
        "type": 1,
        "start_date": "2020-06-12T23:00:00.000Z",
        "slots": null,
        "tags": ["Cupcake"],
        "location_id": {
          "latitude": 55.945743,
          "longitude": -3.233609
        }
    }
]

var parseDateFromDateTimeString = function(dateTimeString) {
  var dateString = dateTimeString.split('T')[0]
  var parts = dateString.split('-');
  var myDate = new Date(parts[0], parts[1] - 1, parts[2]);
  return myDate
}

var parseDateFromDateString = function(dateString) {
  var parts = dateString.split('-');
  var myDate = new Date(parts[0], parts[1] - 1, parts[2]);
  return myDate
}

var dateMatch = function(fromDateString, toDateString, eventDate){
  var fromDate = parseDateFromDateString("1950-02-02")
  var toDate = parseDateFromDateString("3000-02-02")
  var eventDate = parseDateFromDateTimeString(eventDate)
  if ((fromDateString != null) && (fromDateString != undefined)){
    fromDate = parseDateFromDateString(fromDateString)
  }
  if ((toDateString != null) && (fromDateString != undefined)) {
    toDate = parseDateFromDateString(toDateString)
  }
  if ((eventDate - fromDate >= 0 ) && (eventDate - toDate <= 0)) {
    return true
  } else {
    return false
  }
}

var tagsMatch = function (target_tags, event_tags) {
  if ((target_tags === null) || (target_tags === undefined)) {
    return true;
  }
    return event_tags.some(function (tag) {
        return target_tags.indexOf(tag) >= 0;
    });
};

var coordinatesMatch = function (event_location, target_coordinates, radius) {
  var variance = 0.0017 * radius
  if (
    (event_location.latitude <= target_coordinates.latitude + variance) &&
    (event_location.latitude >= target_coordinates.latitude - variance) &&
    (event_location.longitude <= target_coordinates.longitude + variance) &&
    (event_location.longitude >= target_coordinates.longitude - variance)
  ) {
    return true;
  }
}

var search = function( events, fromDateString, toDateString, tags, coordinates, radius) {
  //debug info
  console.log("Events:", events)
  console.log("From date:", fromDateString)
  console.log("to Date:", toDateString)
  console.log("tags:", tags)
  console.log("coordinates:", coordinates)
  console.log("Radius:", radius)
  var events_found = []
  events.forEach(function(event) {
    //debug methods:
    console.log("Event:", event)
    console.log("dateMatch:", dateMatch(fromDateString, toDateString, event.start_date))
    console.log("tagsMatch:", tagsMatch(tags, event.tags))
    console.log("coordinatesMatch:", coordinatesMatch(event.location_id, coordinates, radius))


    if ((dateMatch(fromDateString, toDateString, event.start_date)
    && tagsMatch(tags, event.tags))
    && coordinatesMatch(event.location_id, coordinates, radius)) {
      events_found.push(event)
    }
  })
  return events_found
}

module.exports = search;
