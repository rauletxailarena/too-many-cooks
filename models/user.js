function User (firstName, lastName, screenName, dateOfBirth, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.screenName = screenName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.badges = [];
    this.messages = [];
    this.ratings = {};
    this.ratings.receivedRatings = [];
    this.ratings.givenRatings = [];
    this.interests = [];
    this.events = {};
    this.events.attendingEvents = [];
    this.events.hostingEvents = [];
    this.payments = [];
}

User.prototype.getInfo = function() {
    return this.firstName + ' ' + this.lastName;
};

module.exports = User;
