/**
 * Created by ashi on 2014-12-05.
 */

function ShoppingCart() {
    this.items = {};
    this.totalCost = 0;
}

ShoppingCart.prototype.addItem = function (id, name, price) {
    var item = this.items[id];

    if (item == null) {
        this.items[id] = {'id': id, 'name': name, 'cost': price};
    } else {
        item['cost'] += price;
    }

    this.totalCost += price;
};

ShoppingCart.prototype.clear = function () {
    this.items = {};
    this.totalCost = 0;
};