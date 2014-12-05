function loginUser(){
    var userName = document.getElementById("username").value;
    var passWord = document.getElementById("pwd").value;
    var user = userList.getUser(userName);

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
    var user = userList.getUser(userName[1]);
    var userID = document.createTextNode("Employee: " + user['first_name'] + " " + user['last_name']);
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
        customerInfoDiv.style.display = 'block';
        newCustomerFields.style.display = 'none';
    }
}

function chargeCustomer(){

}


function initViews() {
    var beers = inventory.getBeers();
    _.forEach(beerTypes, function (value, beerType) {
        viewCache.addView(beerType,
            new View(beers, ['namn', 'pub_price', 'count'], filters[beerType], 'namn', false));
    });
    viewCache.addView("MISC",
        new View(beers, ['namn', 'varugrupp', 'pub_price', 'count'], filters['MISC'], 'namn', false));
    viewCache.addView("ALL",
        new View(beers, ['namn', 'varugrupp', 'pub_price', 'count'], filters['ALL'], 'namn', false));
}

function init() {
    inventory = new Inventory();
    userList = new UserList();
    viewCache = new ViewCache(function () {
        return inventory.getBeers();
    });
    initViews();
    inventory.refresh(function() {
        viewCache.refreshAll();
        displayItems("ALL");
    });
    userList.refresh();
}

function displayItems(item, sortField) {
    if (item == 'Update') {
        /*allow editing of "Inventory" fields, and sync to database when "Save Changes" is clicked*/
        alert("Updating Inventory not Supported Yet!!!");
    } else {
    view = (item != null) ? viewCache.getView(item) : viewCache.getView("ALL");
    if (sortField != null)
        view.sort(sortField);
    view.display('beers');
    }
}

window.onload = function() {
  init();
};