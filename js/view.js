function View(collection, fields) {
    this.data = collection;
    this.fields = fields;
}

View.prototype.sort = function(field, isNumber) {
    this.data = sort(this.data, field, isNumber);
};

//View.prototype.display = function(table) {
//    $(table + " tr").remove();
//
//    if (this.data == null)
//        return;
//
//    var header = this.fields;
//
//    var headerRow = "<tr>";
//    _(header).forEach(function (key) {
//        headerRow = headerRow + "<th>" + key + "</th>";
//    });
//    headerRow = headerRow + "</tr>"
//    $(table + " thead").append(headerRow);
//
//    var row = $(table).insertRow;
//    var that = this;
//
//    _(this.data).forEach(function (beer) {
//        row = "<tr>";
//        _(that.fields).forEach(function (field) {
//            row = row + "<td>" + beer[field] + "</td>";
//        });
//        row += "</tr>";
//        $(table).append(row);
//    });
//
//    $(table + " tr").click(function() {
//        alert($(this).text());
//    });
//};

View.prototype.display = function(tableId) {
    if (this.data == null)
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
        headerRowStr += "<th>" + key + "</th>";
    });
    headerRow.innerHTML = headerRowStr;

    var rowCount = 0;
    var that = this;
    _(this.data).forEach(function (beer) {
        var row = body.insertRow(rowCount);
        cellCount = 0;
        _(that.fields).forEach(function (field) {
            var cell = row.insertCell(cellCount);
            cell.innerHTML = beer[field];
            cellCount++;
        });
        row.onclick = function() {
            console.log(beer['beer_id']);
        };
        rowCount++;
    });

};