/* Populate namespace */

/**
 * requestAnimationFrame shim by Paul Irish
 */
window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000/60);
        };
})();

loadGlobals();
displayItems('ALL');

function loginUser(){
    var userName = document.getElementById("loginUsername").value;
    var passWord = document.getElementById("loginPwd").value;
    var user = globals.userList.getUser(userName);

    if (user == null || userName != passWord) {
        alert("Incorrect username or password");
        return;
    }

    displayUserInfo(user);
    globals.loggedInUser = user;

    displayItems();

    $("#loginBlock").hide();

    if (globals.carts[userName] == null)
        globals.carts[userName] = new ShoppingCart(userName, "cart", "SEK");
    globals.shoppingCart = globals.carts[userName];

    languageManager.setLanguage();
}

function displayUserInfo(user) {
    var userTag;
    if (user.isEmployee()) {
        userTag = "<text class=employee_string>Employee</text>: " + user.firstName + " " + user.lastName;

        $("#employeeInfoAndLogout").show();
        $("#employeeName").html(userTag);
        $("#beersOfTheWeek").hide();
        $("#drinkMenu").hide();
        $("#Content").hide();
        $("#employeeMenu").show();
    } else {
        userTag = "<text class=customer_string>Customer</text>: " + user.firstName + " " + user.lastName;
        var userTabAmount = "<text class=credit_string>Credit</text>: " + user.assets;

        $("#customerInfo").show();
        $("#customerName").html(userTag);
        $("#customerTab").html(userTabAmount);
        $("#shoppingCart").show();
        $("#beersOfTheWeek").hide();
    }
}

function displayCart(){
    $("#shoppingCart").show();
}

function logOut(){
    $("#loginBlock").show();
    $("#customerInfo").hide();
    $("#employeeInfoAndLogout").hide();
    $("#employeeTabInfo").hide();
    $("#shoppingCart").hide();
    $("#beersOfTheWeek").show();
    $("#drinkMenu").show();
    $("#Content").show();
    $("#employeeContent").hide();
    $("#employeeMenu").hide();
    $("#employeeButtonsH").hide();
    globals.loggedInUser = null;
    displayItems();
}

function showInventory() {
    $("#Content").hide();
    $("#shoppingCart").hide();
    $("#drinkMenu").show();
    $("#employeeContent").show();
    $("#employeeButtonsH").show();
    $("#employeeMenu").hide();
    $("#employeeInventory").show();
    $("#filterForm").show();
    displayItems("ALL", "employeeInventory");
}

function showCustomers() {
    $("#Content").hide();
    $("#shoppingCart").hide();
    $("#drinkMenu").hide();
    $("#employeeContent").show();
    $("#employeeButtonsH").show();
    $("#employeeMenu").hide();
    $("#employeeInventory").show();
    $("#filterForm").hide();
    globals.userList.display("employeeInventory");
    languageManager.setLanguage();
}

function takeOrder() {
    $("#drinkMenu").show();
    $("#employeeContent").hide();
    $("#Content").show();
    $("#shoppingCart").show();
    $("#employeeButtonsH").show();
    $("#employeeMenu").hide();
}

function filterInventory() {
    var filterName = $("#filterName").val();
    var view = globals.currentView;
    var filter = view.tempFilter;
    view.tempFilter = new Filter('namn', [filterName], true, false);
    view.refresh();
    view.display("employeeInventory");
    view.tempFilter = filter;
}

function createNewCustomer(){
    var customerInfoDiv = document.getElementById("editOrAddCustomerInfo");
    var newCustomerFields = document.getElementById("createNewCustomer");
    var tabTable = document.getElementById("tabs");
    tabTable.style.display = 'none';
    customerInfoDiv.style.display = 'none';
    newCustomerFields.style.display = 'block';
}

function addCustomer(){
    var firstName = document.getElementById("firstName").value;
    var surname = document.getElementById("surname").value;
    var userName = document.getElementById("username").value;
    var password = document.getElementById("pwd").value;
    var passwordConfirm = document.getElementById("pwdConfirm").value;

    if(firstName==''||surname==''||userName==''||password==''||passwordConfirm==''){
        alert("All fields must be filled in");
    } else if(password != passwordConfirm){
        alert("Password and Confirm Password Do Not Match");
    } else {
        /*add code here to send info to the database*/

        var customerInfoDiv = document.getElementById("editOrAddCustomerInfo");
        var newCustomerFields = document.getElementById("createNewCustomer");
        var tabTable = document.getElementById("tabs");
        tabTable.style.display = 'block';
        customerInfoDiv.style.display = 'block';
        newCustomerFields.style.display = 'none';
    }
}

function sortCurrentView(sortField, table) {
    var view = globals.currentView;
    if (view == null)
        return;
    var user = globals.loggedInUser;
    view.sort(sortField, (sortField == "count" || sortField == "pub_price"));
    view.display(table || (user != null && user.isEmployee()) ? "employeeInventory" : "beers");
}

function sortUserList(sortField) {
    var userList = globals.userList;
    userList.sort(sortField);
    userList.display("employeeInventory");
}

function displayItems(item, table, sortField) {
    if (item == 'Update') {
        /*allow editing of "Inventory" fields, and sync to database when "Save Changes" is clicked*/
        alert("Updating Inventory not Supported Yet!!!");
    } else {
        var view = (item != null) ? globals.viewCache.getView(item) : globals.viewCache.getView("ALL");
        if (sortField != null)
            view.sort(sortField);
        globals.currentView = view;
        var user = globals.loggedInUser;
        view.display(table || (user != null && user.isEmployee()) ? "employeeInventory" : "beers");
        languageManager.setLanguage();
    }
}

function storeGlobals() {
    storage.set("inventory", globals.inventory.toJSON());
    storage.set("userList", globals.userList.toJSON());
    storage.set("viewCache", globals.viewCache.toJSON());
}

function loadGlobals() {
    globals.inventory.loadJSON(storage.get("inventory"));
    globals.userList.loadJSON(storage.get("userList"));
    globals.viewCache.loadJSON(storage.get("viewCache"));
    globals.viewCache.refreshAll();
}
