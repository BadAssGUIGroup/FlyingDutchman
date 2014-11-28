/**
 * Created by ashi on 2014-11-28.
 */

var employees = [
    "ervtodd", "hirchr", "jorass", "saskru", "svetor"
];

function User(username, firstName, lastName, assets) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.assets = assets;
}

User.prototype.isEmployee = function () {
    return _.find(employees, function (name) {
            return (name == username);
        }) != null;
};