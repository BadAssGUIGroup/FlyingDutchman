/**
 * Created by ashi on 2014-11-21.
 */

function Inventory () {
    this.header = [];
    this.beers = [];
    this.refreshing = false;
}

Inventory.prototype.clear = function() {
    this.beers = [];
};

Inventory.prototype.addBeer = function(beer) {
    this.beers.push(beer);
};

Inventory.prototype.refresh = function() {
    this.clear();
    this.refreshing = true;
    var that = this;

    request(admin.name, admin.password, actions.getInventory, function (data) {
        var inventory = data.payload;

        _(inventory).forEach(function (beer) {
            request(admin.name, admin.password, actions.getBeerData, function(data) {
                var beer = data.payload[0];
                if (beer == undefined)
                    return;
                if (that.header.length == 0) {
                    that.header = Object.keys(beer);
                }
                that.beers.push(beer);
            }, [{name: "beer_id", value: beer['beer_id']}]);
        });

        that.refreshing = false;
    });
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
    _(this.beers).forEach(function (beer) {
        row = "<tr>";
        _(beer).forEach(function (value) {
            row = row + "<td>" + value + "</td>";
        });
        row += "</tr>";
        $(table).append(row);
    });
};