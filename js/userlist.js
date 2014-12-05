/**
 * Created by ashi on 2014-11-28.
 */

function UserList() {
    this.userList = [];
    this.users = {};
    this.refreshing = false;
}

UserList.prototype.clear = function() {
    this.beers = {};
};

UserList.prototype.getUser = function (username) {
    return this.users[username];
};

UserList.prototype.refresh = function(callback) {
    this.clear();
    this.refreshing = true;
    var that = this;

    request(globals.admin.name, globals.admin.password, globals.actions.getUsers, function (data) {
        that.userList = data.payload;

        _.forEach(that.userList, function (user) {
            that.users[user['username']] = new User(user['username'], user['first_name'], user['last_name'], user['assets']);
        });

        if (callback != null)
            callback();

        that.refreshing = false;
    });

};

UserList.prototype.toJSON = function () {
    return {'userList': this.userList, 'users': this.users};
};

UserList.prototype.loadJSON = function (json) {
    this.userList = json['userList'];
    this.users = json['users'];
};
