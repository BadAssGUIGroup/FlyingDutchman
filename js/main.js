var inventory;

function init() {
    inventory = new Inventory();
    inventory.refresh();
    inventory.display("#beers");
}

// Init inventory once page is loaded
window.onload = function() {
  init();
};