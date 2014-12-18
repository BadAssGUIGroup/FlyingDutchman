var defaultLanguage = "english";

function LanguageManager() {
    this.languages = {};
    this.currentLanguage = defaultLanguage;
}

LanguageManager.prototype.setLanguage = function(language) {
    if (language)
        this.currentLanguage = language;
    else
        var language = this.currentLanguage;
    _.forEach(this.languages[language], function (value, key) {
        $("#" + key).html(value);
        $("." + key).html(value);
    });
};

LanguageManager.prototype.addLanguage = function(language, dictionary) {
    this.languages[language] = dictionary;
};

LanguageManager.prototype.setString = function (language, key, string) {
    this.languages[language][key] = string;
};

LanguageManager.prototype.getString = function (language, key) {
    this.languages[language][key] = string;
};

var languageManager = new LanguageManager();

var swedish = {
    'button_all': "Alla",
    'button_lb': "Ljusa öl",
    'button_ps': "Porters och Stouts",
    'button_ms': "Diverse",
    'button_dl': "Mörka öl",
    'button_ale': "Ale",
    'button_wb': "Veteöl",

    'userLogin': "Användarnamn:",
    'userPWD': "Lösenord:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",

    'button_login': "Logga in",
    'button_logout': "Logga ut",
    'button_updateInventory': "Uppdatera lager",

    'table_headerName': "Namn",
    'table_headerType': "Typ",
    'table_headerPrice': "Pris",
    'table_headerInventory': "Lager",
    'table_headerAvailability': "Lagerstatus",
    'table_headerQuantity': "Antal",
    'table_headerTotal': "Totalt",
    'table_cellInStock': "I lager",
    'table_cellNotInStock': "Ej i lager",

    'cart_clear': "Rensa",
    'cart_checkout': "Köp",
    'cart_undo': "Undo",
    'cart_redo': "Redo"
};


var english = {
    'button_all': "All",
    'button_lb': "Light Beers",
    'button_ps': "Porters and Stouts",
    'button_ms': "Misc",
    'button_dl': "Dark lager",
    'button_ale': "Ale",
    'button_wb': "Wheat beers",

    'userLogin': "Username:",
    'userPWD': "Password:&nbsp;",

    'button_login': "Login",
    'button_logout': "Logout",
    'button_updateInventory': "Update inventory",

    'table_headerName': "Name",
    'table_headerType': "Type",
    'table_headerPrice': "Price",
    'table_headerInventory': "Inventory",
    'table_headerAvailability': "Availability",
    'table_headerQuantity': "Qt.",
    'table_headerTotal': "Total",
    'table_cellInStock': "In stock",
    'table_cellNotInStock': "Not in stock",

    'cart_clear': "Clear",
    'cart_checkout': "Checkout",
    'cart_undo': "Undo",
    'cart_redo': "Redo"
};

languageManager.addLanguage("swedish", swedish);
languageManager.addLanguage("english", english);