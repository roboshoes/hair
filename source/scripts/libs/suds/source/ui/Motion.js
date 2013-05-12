define( [

	"suds/oop/Class",
	"suds/math/Point",
	"suds/math/Bezier"

], function( Class, Point, Bezier ) {

	var Motion = Class.extend( {

		pointA: null,
		pointB: null,
		pointC: null,

		pointAB: null,
		pointBC: null,

		speed: 0.1,
		radius: 10,

		// This class makes a smooth motion while staying within a
		// givin radius.
		//
		// parameters:
		// radius: The radius to which the motion is bound.
		// speed: The speed of the motion (for more detail see Bezier)
		// accuracy: The accuracy for the speed calculation (for more detail see Bezier)

		initialize: function( radius, speed, accuracy ) {

			this.radius = radius || this.radius;
			this.speed = speed || this.speed;
			this.accuracy = accuracy || 10;

			this.bezier = new Bezier( this.speed, true, this.accuracy );

			this.pointA = this.getRandomPoint();
			this.pointB = this.getRandomPoint();
			this.pointC = this.getRandomPoint();

			this.pointAB = this.getMiddle( this.pointA, this.pointB );
			this.pointBC = this.getMiddle( this.pointB, this.pointC );

			this.bezier.addAnchor( this.pointAB );
			this.bezier.addAnchor( this.pointB );
			this.bezier.addAnchor( this.pointBC );
		},

		update: function() {

			if ( this.bezier.isComplete() ) {

				this.bezier = new Bezier( this.speed, true, this.accuracy );

				this.bezier.addAnchor( this.pointBC );
				this.bezier.addAnchor( this.pointC );

				this.pointA = this.pointB;
				this.pointB = this.pointC;
				this.pointC = this.getRandomPoint();

				this.pointAB = this.pointBC;
				this.pointBC = this.getMiddle( this.pointB, this.pointC );

				this.bezier.addAnchor( this.pointBC );

				this.bezier.calculate();

				return;
			}

			this.bezier.update();
		},

		getRandomPoint: function() {
			var angle = Math.random() * Math.PI * 2;

			return new Point(
				Math.cos( angle ) * ( 0.1 + Math.random() * 0.9) * this.radius,
				Math.sin( angle ) * ( 0.1 + Math.random() * 0.9) * this.radius
			);
		},

		getMiddle: function( a, b ) {
			return Point.add( a, b ).divide( 2 );
		},

		getX: function() {
			return this.bezier.x;
		},

		getY: function() {
			return this.bezier.y;
		},

		getPosition: function() {
			return new Point( this.bezier.x, this.bezier.y );
		}

	} );

	return Motion;

} );
