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
    var userTag;

    if (user == null || userName != passWord) {
        alert("Incorrect username or password");
        return;
    } else if(user.isEmployee()){
        userTag = "Employee: " + user.firstName + " " + user.lastName;

        $("#employeeInfoAndLogout").show();
        $("#employeeName").html(userTag);
        $("#button_updateInventory").show();
        $("#employeeTabInfo").show();
    } else {
        userTag = "Customer: " + user.firstName + " " + user.lastName;
        var userTabAmount = "Current Tab: " + user.assets;

        $("#customerInfo").show();
        $("#customerName").html(userTag);
        $("#customerTab").html(userTabAmount);
        $("#shoppingCart").show();
    }

    $("#loginBlock").hide();

    globals.shoppingCart = new ShoppingCart(user, "cart", "SEK");
    globals.loggedInUser = user;
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
    globals.loggedInUser = null;
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

function chargeCustomer(){

}

function displayItems(item, sortField) {
    if (item == 'Update') {
        /*allow editing of "Inventory" fields, and sync to database when "Save Changes" is clicked*/
        alert("Updating Inventory not Supported Yet!!!");
    } else {
    var view = (item != null) ? globals.viewCache.getView(item) : globals.viewCache.getView("ALL");
    if (sortField != null)
        view.sort(sortField);
    view.display('beers');
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
