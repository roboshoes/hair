require.config( {

	urlArgs: "bust=" +  Date.now(),

	paths: {
		suds: "libs/suds/source",
		dat: "libs/dat",
		text: "libs/require/plugin.text"
	}

} );

require( [ "hair/App" ], function( App ) {

	var app = new App();

} );
