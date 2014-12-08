/**
 * Created by ashi on 2014-12-05.
 */

var cartActions = {
    ADD_ITEM: 0,
    CLEAR: 1
};

function ShoppingCart(id, currency) {
    this.id = id;
    this.items = {};
    this.totalQuantity = 0;
    this.total = 0;
    this.currency = currency;
    this.refreshDisplay();

    this.actionStack = [];
    this.redoStack = [];
}

ShoppingCart.prototype.addItem = function (id, name, price, quantity) {
    var item = this.items[id];
    var quantity = (quantity == null) ? 1 : quantity;
    if (item == null) {
        this.items[id] = {'id': id, 'name': name, 'quantity': quantity, 'total': price * quantity};
    } else {
        item['quantity'] += quantity;
        item['total'] += price * quantity;
    }

    this.totalQuantity += quantity;
    this.total += price * quantity;
    this.refreshDisplay();

    this.actionStack.push({
        'action': cartActions['ADD_ITEM'],
        'content': {'id': id, 'name': name, 'price': price, 'quantity': quantity}
    });

    this.redoStack.clear();
};

ShoppingCart.prototype.clear = function () {
    this.actionStack.push({
        'action': cartActions['CLEAR'],
        'content': {'items': this.items, 'totalQuantity': this.totalQuantity, 'total': this.total}
    });

    this.redoStack.clear();

    this.items = {};
    this.totalQuantity = 0;
    this.total = 0;
    this.refreshDisplay();
};

ShoppingCart.prototype.undo = function () {
    if (this.actionStack.length == 0)
        return;

    var action = this.actionStack.pop();
    this.redoStack.push(action);
    var actionType = action['action'];
    var content = action['content'];

    switch(actionType) {
        case cartActions['ADD_ITEM']:
            var item = this.items[content.id];
            item.quantity -= content.quantity;
            item.total -= content.price * content.quantity;
            this.totalQuantity -= content.quantity;
            this.total -= content.price * content.quantity;
            if (item.quantity <= 0) {
                delete this.items[content.id];
            }
            break;
        case cartActions['CLEAR']:
            this.items = content.items;
            this.totalQuantity = content.totalQuantity;
            this.total = content.total;
            break;
        default:
    }

    this.refreshDisplay();
};

ShoppingCart.prototype.redo = function() {
    if (this.redoStack.length == 0)
        return;

    var action = this.redoStack.pop();
    var actionType = action['action'];
    var content = action['content'];

    switch(actionType) {
        case cartActions['ADD_ITEM']:
            this.addItem(content.id, content.name, content.price, content.quantity);
            break;
        case cartActions['CLEAR']:
            this.clear();
            break;
        default:
    }
};

ShoppingCart.prototype.checkout = function() {
    alert("pfft!");
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
