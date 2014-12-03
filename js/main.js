function loginUser(){
    var userName = document.getElementById("username").value;
    var passWord = document.getElementById("pwd").value;
    var userID;
    var userTabAmount;

    var user = userList.getUser(userName);
    if (user == null || userName != passWord) {
        alert("Incorrect username or password");
    } else if(user.isEmployee()){
        var employeeHTMLString = "employee.html?user=" + userName;
        window.location.href = employeeHTMLString;
    } else {
        userID = document.createTextNode("Customer: " + user.firstName + " " + user.lastName);
        userTabAmount = document.createTextNode("Current Tab: " + user.assets);

        /* create and style button */
        var logOutButton = document.createElement("BUTTON");
        logOutButton.setAttribute('type', 'button');
        logOutButton.style.height = "25px";
        logOutButton.style.width = "100px";
        logOutButton.innerHTML = "Logout";
        logOutButton.onclick = logOut;

        /* clear and update login block to contain customer info */
        var infoToReplace = document.getElementById("loginBlock");
        infoToReplace.innerHTML = '';
        infoToReplace.appendChild(userID);
        infoToReplace.appendChild(userTabAmount);
        infoToReplace.appendChild(logOutButton);
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

}

function editTab(){

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
    view = (item != null) ? viewCache.getView(item) : viewCache.getView("ALL");
    if (sortField != null)
        view.sort(sortField);
    view.display('beers');
}

window.onload = function() {
  init();
};