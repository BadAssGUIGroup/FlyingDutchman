/**
 * Created by ashi on 2014-12-05.
 */

function ShoppingCart(id, currency) {
    this.id = id;
    this.items = {};
    this.totalQuantity = 0;
    this.total = 0;
    this.currency = currency;
}

ShoppingCart.prototype.addItem = function (id, name, price, quantity) {
    var item = this.items[id];
    var quantity = (quantity == null) ? 1 : quantity;
    if (item == null) {
        this.items[id] = {'id': id, 'name': name, 'quantity': quantity, 'total': price};
    } else {
        item['quantity'] += quantity;
        item['total'] += price * quantity;
    }

    this.totalQuantity += quantity;
    this.total += price * quantity;
    this.refreshDisplay();
};

ShoppingCart.prototype.clear = function () {
    this.items = {};
    this.total = 0;
};

ShoppingCart.prototype.checkout = function() {

};

ShoppingCart.prototype.refreshDisplay = function() {
    var items = document.getElementById(this.id + "_items");
    var totalQuantity = document.getElementById(this.id + "_total_quantity")
    var total = document.getElementById(this.id + "_total");
    var body = items.getElementsByTagName('tbody')[0];

    var bodyString = "";
    _.forEach(this.items, function (beer) {
        bodyString += "<tr><td>" + beer['name'] + "</td><td>" + beer['quantity'] + "</td><td>" + beer['total'] + " " + this.currency + "</td></tr>";
    }, this);

    body.innerHTML = bodyString;
    totalQuantity.innerHTML = this.totalQuantity;
    total.innerHTML = this.total + " " + this.currency;
};
