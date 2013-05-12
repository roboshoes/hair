define( function() {

	var language = window.navigator.language || window.navigator.browserLanguage;
	var LanguageHelper = {};

	LanguageHelper.getBrowserCountry = function() {
		if ( language.length > 2 ) {
			return language.substr( 3, 2 ).toLowerCase();
		} else return "";
	}

	LanguageHelper.getBrowserLanguage = function() {
		return language.substr( 0, 2 ).toLowerCase();
	}

	return LanguageHelper;

} );