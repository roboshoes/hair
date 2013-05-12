define( function() {

	return function( value ) {
		var string = value.toString();
		var index = string.indexOf( "." ) - 1;

		if ( index < 0 ) index = string.length - 1;

		for ( var i = index - 2; i > 0; i -= 3 ) {
			string = string.substring( 0, i ) + "," + string.substring( i );
		}

		return string;
	}
} );