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

// ==== DOM Utility Functions from PastryKit === //

Element.prototype.hasClassName = function (a) {
    return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)").test(this.className);
};

Element.prototype.addClassName = function (a) {
    if (!this.hasClassName(a)) {
        this.className = [this.className, a].join(" ");
    }
};

Element.prototype.removeClassName = function (b) {
    if (this.hasClassName(b)) {
        var a = this.className;
        this.className = a.replace(new RegExp("(?:^|\\s+)" + b + "(?:\\s+|$)", "g"), " ");
    }
};

Element.prototype.toggleClassName = function (a) {
    this[this.hasClassName(a) ? "removeClassName" : "addClassName"](a);
};

// ======================= DDD mini framework =============================== //

(function(){

    var DDD = {};
// again, borrowed from PastryKit
    DDD.isTangible = !!('createTouch' in document);
    DDD.CursorStartEvent = DDD.isTangible ? 'touchstart' : 'mousedown';
    DDD.CursorMoveEvent = DDD.isTangible ? 'touchmove' : 'mousemove';
    DDD.CursorEndEvent = DDD.isTangible ? 'touchend' : 'mouseup';

    /* ==================== EventHandler ==================== */

    DDD.EventHandler = function() {};

    DDD.EventHandler.prototype.handleEvent = function( event ) {
        if ( this[event.type] ) {
            this[event.type](event);
        }
    };

    /* ==================== Test 3D transform support ==================== */
    var transformProp = Modernizr.prefixed('transform');

    DDD.translate = Modernizr.csstransforms3d ?
        function( x, y ) {
            return 'translate3d(' + x + 'px, ' + y + 'px, 0 )';
        } :
        function( x, y ) {
            return 'translate(' + x + 'px, ' + y + 'px)';
        };


    /* ==================== Start Up ==================== */
    DDD.init = function() {
    };
    window.addEventListener( 'DOMContentLoaded', DDD.init, false);
    window.DDD = DDD;
})();