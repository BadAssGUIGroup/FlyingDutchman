/**
 * Created by ashi on 2014-11-24.
 */

// Global variables for connecting to the database

var admin = {name: "ervtod", password: "ervtod"};
var databaseURL = "http://pub.jamaica-inn.net/fpdb/api.php";
var actions = {getInventory: "inventory_get", getBeerData: "beer_data_get", getUsers: "iou_get_all"};


var inventory;
var viewCache;
var userList;

var beerTypes = {
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

var headerNames = {
    'namn': "Name",
    'varugrupp': "Type",
    'pub_price': "Price",
    'count': "Inventory"
};

var views = Object.keys(beerTypes);
views.push('MISC');
views.push('ALL');

var filters = _.mapValues(beerTypes, function (value) {
    return new Filter('varugrupp', [value], true, false);
});
filters['MISC'] = new Filter('varugrupp', beerTypes, true, true);
filters['ALL'] = new Filter();