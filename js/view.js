/**
 * Created by ashi on 2014-11-24.
 */

function View(data, fields, filter, sortField, sortFieldIsNumber) {
    this.fields = fields;
    this.filter = filter;
    this.tempFilter = null;
    this.sortField = sortField;
    this.sortFieldIsNumber = (sortFieldIsNumber == true);
    this.data = data;
    this.viewData = null;
}

View.prototype.set = function (view) {
    this.fields = view.fields;
    this.filter = view.filter;
    this.sortField = view.sortField;
    this.sortFieldIsNumber = view.sortFieldIsNumber;
    this.data = view.data;
    this.viewData = view.viewData;
};

View.prototype.refresh = function(data) {
    if (data != null)
        this.data = data;
    this.viewData = (this.filter != null) ?
        _.filter(this.data, function (datum) {
            return this.filter.pass(datum) && (this.tempFilter == null || this.tempFilter.pass(datum));
        }, this) :
        this.data;
    if (this.sortField != null)
        this.viewData = sort(this.viewData, this.sortField, this.sortFieldIsNumber);
};

View.prototype.sort = function(field, fieldIsNumber) {
    this.viewData = sort(this.viewData, field, fieldIsNumber);
};

View.prototype.display = function(tableId) {
    if (this.viewData == null)
        return;

    var isEmployee = (globals.loggedInUser != null && globals.loggedInUser.isEmployee());

    var table = document.getElementById(tableId);
    var header = table.getElementsByTagName('thead')[0];
    var body = table.getElementsByTagName('tbody')[0];

    _.forEach(header.rows, function (row, nr) {
        header.deleteRow();
    });

    _.forEach(body.rows, function (row, nr) {
        body.deleteRow();
    });

    var headerRow = header.insertRow();
    var headerRowStr = "";
    _(this.fields).forEach(function (key) {
        var headerName = globals.headerNames[key];
        if (headerName == "Inventory" && isEmployee != true)
            headerName = "Availability";
        var headerId = "table_header" + headerName;
        headerRowStr += "<th class=" + headerId + " onclick=\"sortCurrentView('" + key + "')\">" + headerName + "</th>";
    });
    headerRow.innerHTML = headerRowStr;

    var rowCount = 0;
    var that = this;
    _(this.viewData).forEach(function (beer) {
        var row = body.insertRow(rowCount);
        row.draggable = true;
        row.ondragstart = function(ev) {
            ev.dataTransfer.setData("beerId", beer['beer_id']);
        };
        var cellCount = 0;
        _(that.fields).forEach(function (field) {
            var cell = row.insertCell(cellCount);
            var value = beer[field];
            if (isEmployee != true && field == "count") {
                if (value > 0) {
                    cell.innerHTML = "In stock";
                    cell.className = "table_cellInStock";
                } else {
                    cell.innerHTML = "Not in stock";
                    cell.className = "table_cellNotInStock";
                }
            } else
                cell.innerHTML = value;
            cellCount++;
        });

        if (tableId == "employeeInventory") {
            row.onclick = function () {
                globals.inventory.restockBeer(beer['beer_id'], 1);
                globals.currentView.refresh();
                globals.currentView.display("employeeInventory");
            };
        } else {
            row.onclick = function () {
                if (globals.shoppingCart != null)
                    globals.shoppingCart.addItem(beer['beer_id'], beer['namn'], beer['pub_price']);
            };
        }
        rowCount++;
    });

};