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

function displayItems(item) {
    view = (item == null) ?
        inventory.getView(['namn', 'namn2', 'varugrupp', 'pub_price', 'count']) :
        inventory.getView(['namn', 'namn2', 'varugrupp', 'pub_price', 'count'], 'varugrupp', beerTypes[item]);
    view.sort('namn');
    view.display('beers');
}


function init() {
    inventory = new Inventory();
    inventory.refresh(function() {
        displayItems();
        //view = inventory.getView(['namn', 'varugrupp', 'pub_price', 'count']);
        //view.sort('varugrupp');
        //view.display("#beers");
    });
}

// Init inventory once page is loaded
window.onload = function() {
  init();
};