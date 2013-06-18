require.config( {

	urlArgs: "bust=" +  Date.now(),

	paths: {
		suds: "libs/suds/source",
		dat: "libs/dat",
		text: "libs/require/plugin.text"
	}

} );

require( [ "hair/App" ], function( App ) {

	var tag = document.getElementById( "tag" );
	var app = new App();

	setTag();

	function setTag() {
		tag.className = "before in";

		setTimeout( function() {
			tag.className = "";
		}, 300 );
	}


} );
