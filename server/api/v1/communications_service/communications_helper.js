var include_participant = function(participant_id, participants_array) {
  var found = false
  participants_array.forEach(function(participant) {
    console.log("Comparing" + participant_id + " " + participant.user_id)
    if (participant_id == participant.user_id) {
      found = true
    }
  })

  if (!(found)) {
    participants_array.push({
      "user_id": participant_id
    })
  }

  return participants_array
}

module.exports = include_participant
