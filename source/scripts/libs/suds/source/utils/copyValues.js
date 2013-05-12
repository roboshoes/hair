define( function() {
	return function( object, values, override ) {
		for ( var key in values ) {

			if ( override && typeof object.key !== "undefined" ) continue;

			object[ key ] = values[ key ];
		}
	};
} );