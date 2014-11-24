/**
 * Created by ashi on 2014-11-21.
 */

function request(username, password, action, callback, params) {
    var url = databaseURL + "?username=" + username + "&password=" + password + "&action=" + action;

    _(params).forEach(function (param) {
        url += "&" + param['name'] + "=" + param['value'];
    });

    $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        success: callback
    });
}

function prune(collection, keys) {
    return _.map(collection, function (elem) {
        return _.filter(elem, function (field, key) {
            return _.contains(keys, key);
        })
    })
}



function sort(collection, key, isNumber) {
    if (isNumber == true) {
        return _.sortBy(collection, function(elem) {
            return parseInt(elem[key]);
        });
    } else {
        return _.sortBy(collection, key);
    }
}