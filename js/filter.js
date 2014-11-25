/**
 * Created by ashi on 2014-11-24.
 */

function SubFilter(field, values, substring, isNegative) {
    this.field = field;
    this.values = values;
    this.substring = (substring == true);
    this.isNegative = (isNegative == true);
}

SubFilter.prototype.pass = function(object) {
    var eval = object[this.field];
    var contains;

    if (this.substring) {
        contains = _.some(this.values, function (value) {
            return eval.indexOf(value) > -1
        });
    } else {
        contains = _.some(this.values, function (value) {
            return eval == value;
        });
    }

    if (this.isNegative)
        return !contains;
    else
        return contains;
};

function Filter(field, values, substring, isNegative) {
    this.subFilters = [];
    if (field != null) {
        this.addFilter(new SubFilter(field, values, substring, isNegative));
    }
}

Filter.prototype.addFilter = function(subFilter) {
    this.subFilters.push(subFilter);
};

Filter.prototype.pass = function(object) {
    return _.all(this.subFilters, function (subFilter) {
        return subFilter.pass(object);
    })
};