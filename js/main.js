var inventory;

function displayItems(item){
    document.getElementById("test").innerHTML = item;
}
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

function init() {
    inventory = new Inventory();
    inventory.refresh(function() {
        inventory.display("#beers")
    });
}

// Init inventory once page is loaded
window.onload = function() {
  init();
};