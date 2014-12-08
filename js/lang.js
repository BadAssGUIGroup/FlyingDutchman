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
    'button_lb': "Ljus lager"
};

var english = {
    'button_lb': "Light Beers"
};

languageManager.addLanguage("swedish", swedish);
languageManager.addLanguage("english", english);