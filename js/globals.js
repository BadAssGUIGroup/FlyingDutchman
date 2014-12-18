/**
 * Created by ashi on 2014-11-24.
 */

// Global variables for connecting to the database

var globals = {};
globals.botw = new BeersOfTheWeek();
globals.admin = {name: "ervtod", password: "ervtod"};
globals.databaseURL = "http://pub.jamaica-inn.net/fpdb/api.php";
globals.actions = {getInventory: "inventory_get", getBeerData: "beer_data_get", getUsers: "iou_get_all", purchase: "purchases_append"};

globals.carts = {};

globals.inventory = new Inventory();
globals.userList = new UserList();
globals.viewCache = new ViewCache(function () {
    return globals.inventory.getBeers();
});

globals.beerTypes = {
    ALCOHOL_FREE: "Alkoholfritt",
    LIGHT_LAGER: "Ljus lager",
    DARK_LAGER: "Mörk lager",
    PORTER_AND_STOUT: "Porter och Stout",
    WHEAT_BEER: "Veteöl",
    ALE: "Ale",
    RED_WINE: "Rött vin",
    WHITE_WINE: "Vitt vin",
    CIDER: "Cider"
};

globals.headerNames = {
    'namn': "Name",
    'varugrupp': "Type",
    'pub_price': "Price",
    'count': "Inventory"
};

globals.views = Object.keys(globals.beerTypes);
globals.views.push('MISC');
globals.views.push('ALL');

globals.filters = _.mapValues(globals.beerTypes, function (value) {
    return new Filter('varugrupp', [value], true, false);
});
globals.filters['MISC'] = new Filter('varugrupp', globals.beerTypes, true, true);
globals.filters['ALL'] = new Filter();

function initViews() {
    _.forEach(globals.beerTypes, function (value, beerType) {
        globals.viewCache.addView(beerType,
            new View(null, ['namn', 'pub_price', 'count'], globals.filters[beerType], 'namn', false));
    });
    globals.viewCache.addView("MISC",
        new View(null, ['namn', 'varugrupp', 'pub_price', 'count'], globals.filters['MISC'], 'namn', false));
    globals.viewCache.addView("ALL",
        new View(null, ['namn', 'varugrupp', 'pub_price', 'count'], globals.filters['ALL'], 'namn', false));
}

initViews();