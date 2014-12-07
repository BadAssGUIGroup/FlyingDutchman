/**
 * Created by ashi on 2014-12-05.
 */

var storage = {
    set: function (key, value) {
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        window.localStorage.setItem(key, value);
    },

    get: function (key) {
        var value = window.localStorage.getItem(key);
        if (value == null)
            return;
        else if (value[0] === "{") {
            value = JSON.parse(value);
        }
        return value;
    }
};
