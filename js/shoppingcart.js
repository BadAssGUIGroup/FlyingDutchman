/**
 * Created by ashi on 2014-12-05.
 */

var cartActions = {
    ADD_ITEM: 0,
    CLEAR: 1
};

function ShoppingCart(userName, id, currency) {
    this.userName = userName;
    this.id = id;
    this.items = {};
    this.totalQuantity = 0;
    this.total = 0;
    this.currency = currency;
    this.refreshDisplay();

    this.actionStack = [];
    this.redoStack = [];
}

ShoppingCart.prototype.addItem = function (id, name, price, quantity, redo) {
    var item = this.items[id];
    var quantity = (quantity == null) ? 1 : quantity;
    var beer = globals.inventory.getBeer(id);
    var stock = beer['count'];

    if (quantity + ((item == null) ? 0 : (item['quantity'])) > stock) {
        alert("Not in stock!");
        return;
    }

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

    if (redo == undefined)
        this.redoStack = [];
};

ShoppingCart.prototype.clear = function (redo) {
    this.actionStack.push({
        'action': cartActions['CLEAR'],
        'content': {'items': this.items, 'totalQuantity': this.totalQuantity, 'total': this.total}
    });

    if (redo == undefined)
        this.redoStack = [];

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
            this.addItem(content.id, content.name, content.price, content.quantity, true);
            break;
        case cartActions['CLEAR']:
            this.clear(true);
            break;
        default:
    }
};

ShoppingCart.prototype.checkout = function() {
    if (!window.confirm("Confirm order!"))
        return;

    var username = this.userName;

    _.forEach(this.items, function(item, id) {
        var quantity = item['quantity'];
        for (var i = 0; i < quantity; i++) {
            request(username, username, globals.actions.purchase, function(data) {
            }, [{name: "beer_id", value: id}]);
        }
        globals.userList.getUser(username).assets -= item['total'];
        globals.inventory.removeBeer(id, quantity);
    });

    this.clear();
    this.actionStack = [];
    this.redoStack = [];
};

ShoppingCart.prototype.refreshDisplay = function() {
    var bodyString = "";
    _.forEach(this.items, function (beer) {
        bodyString += "<tr><td>" + beer['name'] + "</td><td>" + beer['quantity'] + "</td><td>" + beer['total'] + " " + this.currency + "</td></tr>";
    }, this);

    $("#" + this.id + "_items").children("tbody").html(bodyString);
    $("#" + this.id + "_total_quantity").html(this.totalQuantity);
    $("#" + this.id + "_total").html(this.total + " " + this.currency);
};
