/**
 * Created by ashi on 2014-11-21.
 */

function Inventory () {
    this.inventory = [];
    this.header = [];
    this.beers = {};
    this.refreshing = false;
}

Inventory.prototype.clear = function() {
    this.beers = {};
};

Inventory.prototype.addBeer = function(beer) {
    this.beers[beer['nr']] = beer;
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
                var beer = data.payload[0];

                if (beer != undefined)
                    that.addBeer(beer);

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

Inventory.prototype.getBeer = function(field, value) {
    return _.find(this.beers, function (beer) {
        return (beer[field] != undefined && beer[field] == value);
    });
};

Inventory.prototype.getBeers = function(field, value) {
    return _.filter(this.beers, function (beer) {
        return (beer[field] != undefined && beer[field] == value);
    });
};

Inventory.prototype.getBeers = function(filter) {
    if (filter == null) {
        return _.map(this.beers, function (beer, id) {
            return beer;
        })
    } else {
        return _.filter(this.beers, function (beer, id) {
            if (filter(beer))
                return true;
            else
                return false;
        })
    }
};

Inventory.prototype.display = function(table) {
    $(table + " tr").remove();

    if (this.beers == null)
        return;

    var headerRow = "<tr>";
    _(this.header).forEach(function (key) {
        headerRow = headerRow + "<th>" + key + "</th>";
    });
    headerRow = headerRow + "</tr>"
    $(table + " thead").append(headerRow);

    var row = "";
    _(this.beers).forEach(function (beer, id) {
        row = "<tr>";
        _(beer).forEach(function (field) {
            row = row + "<td>" + field + "</td>";
        });
        row += "</tr>";
        $(table).append(row);
    });
};