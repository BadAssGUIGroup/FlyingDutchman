/**
 * Created by ashi on 2014-12-05.
 */

/**
 * comment here
 */

function init() {
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