/**
 * Created by ashi on 2014-11-24.
 */

// Global variables for connecting to the database

var admin = {name: "ervtod", password: "ervtod"};
var databaseURL = "http://pub.jamaica-inn.net/fpdb/api.php";
var actions = {getInventory: "inventory_get", getBeerData: "beer_data_get"};


var inventory; // default inventory
var view; // default view

var beerTypes = {
    ALCOHOL_FREE: "Alkoholfritt",
    LIGHT_LAGER: "Ljus lager",
    DARK_LAGER: "Mörk lager",
    PORTER_AND_STOUT: "Porter och Stout",
    WHEAT_BEER: "Veteöl",
    ALE: "Ale"
};
