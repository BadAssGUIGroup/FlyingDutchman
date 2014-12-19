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
    _.forEach(this.languages[language]['id'], function (value, key) {
        $("#" + key).html(value);
    });
    _.forEach(this.languages[language]['class'], function (value, key) {
        $("." + key).html(value);
    });
    _.forEach(this.languages[language]['placeholder'], function (value, key) {
        $("." + key).attr('placeholder', value);
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
    'id': {
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

        'cart_clear': "Rensa",
        'cart_checkout': "Köp",
        'cart_undo': "Undo",
        'cart_redo': "Redo",
        'cart_total_string': "Summa",

        'botw_string': "Veckans Öl",

        'employee_button_logout': "Logga ut",
        'employee_button_inventory': "Lager",
        'employee_button_customers': "Kunder",
        'employee_button_order': "Order",
        'employee_button_inventoryH': "Lager",
        'employee_button_customersH': "Kunder",
        'employee_button_orderH': "Order"
    },
    'class' : {
        'customer_string': "Kund",
        'employee_string': "Anställd",
        'credit_string': "Konto",
        'table_headerName': "Namn",
        'table_headerType': "Typ",
        'table_headerPrice': "Pris",
        'table_headerInventory': "Lager",
        'table_headerAvailability': "Lagerstatus",
        'table_headerQuantity': "Antal",
        'table_headerTotal': "Totalt",
        'table_header_username': "Användarnamn",
        'table_header_first_name': "Förnamn",
        'table_header_last_name': "Efternamn",
        'table_header_assets': "Konto",
        'table_cellInStock': "I lager",
        'table_cellNotInStock': "Ej i lager"
    },
    'placeholder': {
        'input_username': "användarnamn",
        'input_password': "lösenord",
        'input_firstName': "Förnamn",
        'input_surName': "Efternamn",
        'input_filter': "filter"
    }
};


var english = {
    'id': {
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

        'cart_clear': "Clear",
        'cart_checkout': "Checkout",
        'cart_undo': "Undo",
        'cart_redo': "Redo",
        'cart_total_string': "Final Total",

        'botw_string': "Beers of the Week",

        'employee_button_logout': "Logout",
        'employee_button_inventory': "Inventory",
        'employee_button_customers': "Customers",
        'employee_button_order': "Order",
        'employee_button_inventoryH': "Inventory",
        'employee_button_customersH': "Customers",
        'employee_button_orderH': "Order"
    },
    'class': {
        'customer_string': "Customer",
        'employee_string': "Employee",
        'credit_string': "Credit",
        'table_headerName': "Name",
        'table_headerType': "Type",
        'table_headerPrice': "Price",
        'table_headerInventory': "Inventory",
        'table_headerAvailability': "Availability",
        'table_headerQuantity': "Qt.",
        'table_headerTotal': "Total",
        'table_header_username': "Username",
        'table_header_first_name': "First Name",
        'table_header_last_name': "Surname",
        'table_header_assets': "Assets",
        'table_cellInStock': "In stock",
        'table_cellNotInStock': "Not in stock"
    },
    'placeholder': {
        'input_username': "username",
        'input_password': "password",
        'input_firstName': "First Name",
        'input_surName': "Surname",
        'input_filter': "filter"
    }
};

languageManager.addLanguage("swedish", swedish);
languageManager.addLanguage("english", english);