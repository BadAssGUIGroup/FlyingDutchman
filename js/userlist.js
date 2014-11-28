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
}

UserList.prototype.refresh = function(callback) {
    this.clear();
    this.refreshing = true;
    var that = this;

    request(admin.name, admin.password, actions.getUsers, function (data) {
        that.userList = data.payload;

        _.forEach(that.userList, function (user) {
            that.users[user['username']] = user;
        });

        if (callback != null)
            callback();

        that.refreshing = false;
    });

};

