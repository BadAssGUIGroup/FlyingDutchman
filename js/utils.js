/**
 * Created by ashi on 2014-11-21.
 */

function request(username, password, action, callback, params) {
    var url = window.globals.databaseURL + "?username=" + username + "&password=" + password + "&action=" + action;

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

function pruneObject(object, fields) {
    var prunedObject = {};
    _.forEach(fields, function(field) {
        prunedObject[field] = object[field];
    });
    return prunedObject;
}

function prune(collection, fields) {
    return _.map(collection, function (elem) {
        return pruneObject(elem, fields);
    });
}

function sort(collection, field, isNumber) {
    if (isNumber == true) {
        return _.sortBy(collection, function(elem) {
            return parseInt(elem[field]);
        });
    } else {
        return _.sortBy(collection, field);
    }
}

function lexSort(collection, fields) {
    return _.sortBy(collection, function(elem) {
        var str = "";
        var substr;
        _.forEach(fields, function (field) {
            substr = elem[field];
            if (substr != undefined)
                str += substr;
        });
        return str;
    })
}
