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