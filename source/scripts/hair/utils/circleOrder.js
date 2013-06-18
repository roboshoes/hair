define( function() {

	return function( array, pivot ) {

		var length = array.length;
		var newArray = [];
		var i = 0; j = length - 1;

		function shiftIndex( index ) {
			return ( pivot + index ) % length;
		}

		while ( i <= j ) {
			newArray.unshift( array[ shiftIndex( i ) ] );
			if ( i != j ) newArray.unshift( array[ shiftIndex( j ) ] );

			i++;
			j--;
		}

		return newArray;
	}

} );