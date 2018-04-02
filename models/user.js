function User (firstName, lastName, screenName, dateOfBirth, email) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.screenName = screenName;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
}

User.prototype.getInfo = function() {
    return this.firstName + ' ' + this.lastName;
};

module.exports = User;
