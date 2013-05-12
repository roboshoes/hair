define( [

	"suds/utils/copyValues"

], function( copyValues ) {

	return function() {

		var result = {};

		for ( var i = 0; i < arguments.length; i++ ) {
			copyValues( result, arguments[ i ], true );
		}

		return result;
	}

} );