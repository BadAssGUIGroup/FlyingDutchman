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

        that.sort("username");
        that.refreshing = false;
    });
};

UserList.prototype.sort = function(sortField) {
    this.userList = sort(this.userList, sortField, (sortField == "assets"));
};

UserList.prototype.display = function(tableId) {
    var table = document.getElementById(tableId);
    var header = table.getElementsByTagName('thead')[0];
    var body = table.getElementsByTagName('tbody')[0];

    _.forEach(header.rows, function (row, nr) {
        header.deleteRow();
    });

    _.forEach(body.rows, function (row, nr) {
        body.deleteRow();
    });

    var headerRow = header.insertRow();
    var headerRowStr = "";
    var user0 = this.userList[0];

    _.forEach(user0, function (value, key) {
        var headerId = "table_header_" + key;
        headerRowStr += "<th class=" + headerId + " onclick=\"sortUserList('" + key + "')\">" + key + "</th>";
    });
    headerRow.innerHTML = headerRowStr;

    var rowCount = 0;
    var that = this;

    _(this.userList).forEach(function (user) {
        var row = body.insertRow(rowCount);

        var cellCount = 0;
        _.forEach(user, function (value, key) {
            var cell = row.insertCell(cellCount);
            cell.innerHTML = value;
            cellCount++;
        });

        rowCount++;
    });
};

UserList.prototype.toJSON = function () {
    return {'userList': this.userList, 'users': this.users};
};

UserList.prototype.loadJSON = function (json) {
    this.userList = json['userList'];
    _.forEach(this.userList, function (user) {
        this.users[user['username']] = new User(user['username'], user['first_name'], user['last_name'], user['assets']);
    }, this);
};
