/* Populate namespace */

loadGlobals();

function loginUser(){
    var userName = document.getElementById("username").value;
    var passWord = document.getElementById("pwd").value;
    var user = globals.userList.getUser(userName);

    if (user == null || userName != passWord) {
        alert("Incorrect username or password");
    } else if(user.isEmployee()){
        var employeeHTMLString = "employee.html?user=" + userName;
        window.location.href = employeeHTMLString;
    } else {
        var userID = "Customer: " + user.firstName + " " + user.lastName;
        var userTabAmount = "Current Tab: " + user.assets;
        var customerLoginBlock = document.getElementById('loginBlock');
        var customerInfoBlock = document.getElementById('customerInfo');
        var customerName = document.getElementById('customerName');
        var customerTab = document.getElementById('customerTab');

        customerName.innerHTML = userID;
        customerTab.innerHTML = userTabAmount;

        customerLoginBlock.style.display = 'none';
        customerInfoBlock.style.display = 'block';
    }
}

function logOut(){
    window.location.href = "Homepage.html";
}

function employeePageLoadUserInfo(){
    var url = window.location.href;
    var userName = url.split("=");
    var user = globals.userList.getUser(userName[1]);

    var userID = document.createTextNode("Employee: " + user.firstName + " " + user.lastName);
    /* create and style button */
    var logOutButton = document.createElement("BUTTON");
    logOutButton.setAttribute('type', 'button');
    logOutButton.style.height = "25px";
    logOutButton.style.width = "100px";
    logOutButton.innerHTML = "Logout";
    logOutButton.onclick = logOut;

    /* clear and update login block to contain customer info */
    var infoToReplace = document.getElementById("infoAndLogout");
    infoToReplace.innerHTML = '';
    infoToReplace.appendChild(userID);
    infoToReplace.appendChild(logOutButton);
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
        customerInfoDiv.style.display = 'inline-block';
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
