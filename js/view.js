/**
 * Created by ashi on 2014-11-24.
 */

function View(data, fields, filter, sortField, sortFieldIsNumber) {
    this.fields = fields;
    this.filter = filter;
    this.sortField = sortField;
    this.sortFieldIsNumber = (sortFieldIsNumber == true);
    this.data = data;
    this.viewData = null;
}

View.prototype.refresh = function(data) {
    if (data != null)
        this.data = data;
    this.viewData = (this.filter != null) ?
        _.filter(this.data, function (datum) {
            return this.filter.pass(datum);
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
        headerRowStr += "<th>" + headerNames[key] + "</th>";
    });
    headerRow.innerHTML = headerRowStr;

    var rowCount = 0;
    var that = this;
    _(this.viewData).forEach(function (beer) {
        var row = body.insertRow(rowCount);
        cellCount = 0;
        _(that.fields).forEach(function (field) {
            var cell = row.insertCell(cellCount);
            cell.innerHTML = beer[field];
            cellCount++;
        });
        row.onclick = function() {
            //alert("Beer Id: " + beer['beer_id']);
            if (confirm("Add Beer to Cart") == true){
                var name = "name=" + beer['namn'];
                simpleCart.add(name,'price=' + beer['pub_price'], 'quantity=1');
            }
        };
        rowCount++;
    });

};