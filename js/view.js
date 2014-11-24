

function View(collection, fields) {
    this.fields = fields;
    this.data = prune(collection, fields);
}

View.prototype.sort = function(field, isNumber) {
    this.data = sort(this.data, field, isNumber);
};

View.prototype.display = function(table) {
    $(table + " tr").remove();

    if (this.data == null)
        return;

    var header = this.fields;

    var headerRow = "<tr>";
    _(header).forEach(function (key) {
        headerRow = headerRow + "<th>" + key + "</th>";
    });
    headerRow = headerRow + "</tr>"
    $(table + " thead").append(headerRow);

    var row = "";

    _(this.data).forEach(function (beer, id) {
        row = "<tr>";
        _(beer).forEach(function (field) {
            row = row + "<td>" + field + "</td>";
        });
        row += "</tr>";
        $(table).append(row);
    });
};