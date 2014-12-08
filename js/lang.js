function LanguageManager() {
    this.languages = {};
}

LanguageManager.prototype.setLanguage = function(language) {
    _.forEach(this.languages[language], function (value, key) {
        $("#" + key).html(value);
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

    'userLogin': "Användarnamn",
    'userPWD': "Lösenord",

    'button_login': "Logga in",


};

var english = {
    'button_all': "All",
    'button_lb': "Light Beers",
    'button_ps': "Porters and Stouts",
    'button_ms': "Misc",
    'button_dl': "Dark lager",
    'button_ale': "Ale",
    'button_wb': "Wheat beers",

    'userLogin': "Username",
    'userPWD': "Password",

    'button_login': "Login",




};

languageManager.addLanguage("swedish", swedish);
languageManager.addLanguage("english", english);