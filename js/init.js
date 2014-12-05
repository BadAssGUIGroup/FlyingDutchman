/**
 * Created by ashi on 2014-12-05.
 */

/**
 * comment here
 */
function initViews() {
    var beers = globals.inventory.getBeers();
    _.forEach(globals.beerTypes, function (value, beerType) {
        globals.viewCache.addView(beerType,
            new View(beers, ['namn', 'pub_price', 'count'], globals.filters[beerType], 'namn', false));
    });
    globals.viewCache.addView("MISC",
        new View(beers, ['namn', 'varugrupp', 'pub_price', 'count'], globals.filters['MISC'], 'namn', false));
    globals.viewCache.addView("ALL",
        new View(beers, ['namn', 'varugrupp', 'pub_price', 'count'], globals.filters['ALL'], 'namn', false));
}

function init() {
    initViews();
    globals.inventory.refresh(function() {
        globals.viewCache.refreshAll();
        displayItems("ALL");
        globals.userList.refresh(function () {
            storeGlobals();
        });
    });
}

onload = function() {
    init();
};