define( function() {

	return function( array, pivot ) {

		var length = array.length;
		var newArray = [];
		var i = 1, j = 1;

		newArray.unshift( array[ pivot ] );

		while( i > -1 || j > -1 ) {

			if ( i > -1 ) {
				if ( pivot + i > length - 1 ) i = -1;
				else {
					newArray.unshift( array[ pivot + i ] )
					i++;
				}
			}

			if ( j > -1 ) {
				if ( pivot - j < 0 ) j = -1;
				else {
					newArray.unshift( array[ pivot - j ] );
					j++;
				}
			}

		}

		return newArray;
	}

} );