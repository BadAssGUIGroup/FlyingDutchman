/**
 * Created by ashi on 2014-11-25.
 */

function ViewCache(getData) {
    this.getData = getData;
    this.data = null;
    this.views = {};
}

ViewCache.prototype.addView = function(viewName, view) {
    this.views[viewName] = view;
};

ViewCache.prototype.getView = function(viewName) {
    return this.views[viewName];
};

ViewCache.prototype.refreshAll = function () {
    this.data = this.getData();
    _.forEach(this.views, function(view) {
        view.refresh(this.data);
    }, this);
};

ViewCache.prototype.toJSON = function () {
    return {'data': this.data, 'views': this.views};
};

ViewCache.prototype.loadJSON = function (json) {
    this.data = json['data'];
    this.views = json['views'];
};

