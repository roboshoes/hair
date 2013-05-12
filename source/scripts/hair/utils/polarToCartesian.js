define( [

	"suds/math/Point"

], function( Point ) {

	return function polarToCartesian( angle, radius ) {
		return new Point(
			radius * Math.cos( angle ),
			radius * Math.sin( angle )
		);
	}

} );