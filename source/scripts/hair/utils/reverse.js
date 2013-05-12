define( function() {

	return function( array ) {

		var other = [];

		for ( var i = 0; i < array.length; i++ ) {
			other.push( array[ i ] );
		}

		other.reverse();

		return other;
	}

} );