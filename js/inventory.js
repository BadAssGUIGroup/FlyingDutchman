/**
 * Created by ashi on 2014-11-21.
 */

function Inventory () {
    this.inventory = [];
    this.beers = {};
    this.refreshing = false;
}

Inventory.prototype.clear = function() {
    this.beers = {};
};

Inventory.prototype.addBeer = function(beer, beerData) {
    this.beers[beer['beer_id']] = _.assign(beer, beerData);
};

Inventory.prototype.refresh = function(callback) {
    this.clear();
    this.refreshing = true;
    var that = this;

    request(admin.name, admin.password, actions.getInventory, function (data) {
        that.inventory = data.payload;

        var counter = that.inventory.length;

        _(that.inventory).forEach(function (beer) {
            request(admin.name, admin.password, actions.getBeerData, function(data) {
                var beerData = data.payload[0];

                if (beerData != undefined)
                    that.addBeer(beer, beerData);

                counter--;
                if (counter == 0) {
                    if (callback != null) {
                        callback();
                    }
                    that.refreshing = false;
                }
            }, [{name: "beer_id", value: beer['beer_id']}]);
        });
    });
};

Inventory.prototype.getBeer = function(id) {
    return this.beers[id];
};

Inventory.prototype.getBeers = function(field, value) {
    if (field == null)
        return _.toArray(this.beers);
    else
        return _.filter(this.beers, function (beer) {
            return (beer[field] != undefined && beer[field] == value);
        });
};

Inventory.prototype.getFilteredBeers = function(filter) {
    if (filter == null)
        return this.getBeers();
    else
        return _.filter(this.beers, function (beer) {
            if (filter(beer))
                return true;
            else
                return false;
        })
};

Inventory.prototype.getFilteredView = function(fields, filter) {
    var beers = this.getBeers(filter);
    return new View(beers, fields);
};

Inventory.prototype.getView = function(fields, field, value) {
    var beers = (field != null) ? this.getFilteredBeers(function (beer) {
        return (beer[field].indexOf(value) > -1);
    }) : this.getBeers();
    return new View(beers, fields);
};