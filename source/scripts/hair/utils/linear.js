define( function() {

	return function( value, min, max ) {
		return ( value - min ) / ( max - min );
	}

} );