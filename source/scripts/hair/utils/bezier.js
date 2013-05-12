define( function() {

	return function( points, context, section ) {

		var a, b, x, y;

		for ( var i = 1, length = points.length - 2; i < length; i++ ) {

			a = points[ i ][ section ];
			b = points[ i + 1 ][ section ];

			x = ( a.x + b.x ) * .5
			y = ( a.y + b.y ) * .5

			context.quadraticCurveTo( a.x, a.y, x, y );
		}

		a = points[ i ][ section ];
		b = points[ i + 1 ][ section ];

		context.quadraticCurveTo( a.x, a.y, b.x, b.y );
	}

} );