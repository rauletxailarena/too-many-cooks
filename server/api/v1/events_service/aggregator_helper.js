var aggregator_helper = function(events) {
  var temp_id = -1
  aggregated_users = []

  events.forEach(function(event) {
    if (event.id !== temp_id) {
      var user = {
        "id": event.id,
        "host_id": event.host_id,
        "location_id": event.location_id,
        "title": event.title,
        "type": event.type,
        "start_date": event.start_date,
        "slots": event.slots,
        "coordinates": {
          "latitude" : event.latitude,
          "longitude" : event.longitude
        },
        "tags": [event.tag_title],
        "postcode": event.postcode,
        "city": event.city,
        "address": event.address,
        "location_description": event.location_description
      }
      aggregated_users.push(user);
      temp_id = user.id
    } else {
      var last_index = aggregated_users.length - 1
      aggregated_users[last_index].tags.push(event.tag_title)
    }
  })
  return aggregated_users;
}
module.exports = aggregator_helper;
