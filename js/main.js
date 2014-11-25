function customerLogin(){
    var userName = document.getElementById("username").value;
    var passWord = document.getElementById("pwd").value;
    if(userName == 'username' && passWord == 'password'){
        var userID = document.createTextNode("Customer: <> ID Number: <>");
        var userTabAmount = document.createTextNode("Current Tab: <>");
        var infoToReplace = document.getElementById("loginBlock");
        infoToReplace.innerHTML = '';
        infoToReplace.appendChild(userID);
        infoToReplace.appendChild(userTabAmount);

    } else {
        alert("Incorrect username or password");
    }
}


function initViews() {
    var beers = inventory.getBeers();
    _.forEach(beerTypes, function (value, beerType) {
        viewCache.addView(beerType,
            new View(beers, ['namn', 'namn2', 'varugrupp', 'pub_price', 'count'], filters[beerType], 'namn', false));
    });
    viewCache.addView("MISC",
        new View(beers, ['namn', 'namn2', 'varugrupp', 'pub_price', 'count'], filters['MISC'], 'namn', false));
    viewCache.addView("ALL",
        new View(beers, ['namn', 'namn2', 'varugrupp', 'pub_price', 'count'], filters['ALL'], 'namn', false));
}

function init() {
    inventory = new Inventory();
    viewCache = new ViewCache(function () {
        return inventory.getBeers();
    });
    initViews();
    inventory.refresh(function() {
        viewCache.refreshAll();
        displayItems("ALL");
    });
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