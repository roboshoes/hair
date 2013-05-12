define( [

	"suds/oop/Class",
	"suds/math/Point"

], function( Class, Point ) {

	var Bezier = Class.extend( {

		anchors: null,
		time: 0,
		speed: 0.1,
		pixels: null,
		x: null,
		y: null,
		pixelBased: false,

		// This class is used to calculate any position in a bezier curve
		// based on the time. Time is a value in between 0 and 1. 0 representing
		// the start of the curve and 1 the end.
		//
		// The update() method can be used to increase the value of time. By default
		// the increase uses a relative value speed where 0.1 represents 10% of the curve.
		// You can also controll the the curve on a pixel based speed by passing true as
		// second parameter. This will allow to provide a speed such as 17 meaning 17 pixels
		// per update. Consider that this causes more calculation time for every
		// anchor added to the curve.
		// The third parameter, accuracy, is used to determine the accuracy of the pixel based
		// speed. This is needed since the calculation of the length is simply an approximation
		//
		// paramters:
		// speed: integer. between (excluding) 0 and 1 if pixelsBased is false else any value larger than 0
		// pixelBased: boolean. default = false
		// accuracy: integer. any value larger than 1. default = 10

		initialize: function( speed, pixelBased, accuracy ) {
			this.anchors = [];

			this.pixelBased = typeof pixelBased === "undefined" ? false : !! pixelBased;
			this.accuracy = typeof accuracy === "undefined" ? 10 : accuracy;

			this.time = 0;
			this.speed = speed || 0.1;
			this.pixels = this.speed;
		},

		addAnchor: function( point ) {
			this.anchors.push( point );

			if ( this.pixelBased ) {
				var storeTime = this.time,
				    i = 0, accuracy = this.accuracy,
				    sum = 0, a, b;

				for (; i < accuracy; i++ ) {
					this.time = i / accuracy;
					this.calculate();

					if ( i === 0 ) {
						a = new Point( this.x, this.y );
						continue;
					}

					b = a;
					b = new Point( this.x, this.y );

					sum += Point.distance( a, b );
				}

				this.time = storeTime;
				this.speed = Math.min( 1, this.pixels / sum );
			}
		},

		update: function() {
			this.time += this.speed;

			if ( this.time >  1 ) {
				this.time = 1;
			}

			this.calculate();
		},

		calculate: function() {
			var t = this.time;
			var length = this.anchors.length;
			var points = [];
			var i, j;

			for ( i = 0; i < length; i++){
				points[ i ] = { x: this.anchors[ i ].x, y: this.anchors[ i ].y };
			}

			for ( j = 1; j < length; ++j ) {
				for (i = 0; i < length - j; ++i ) {
					points[ i ].x = ( 1 - t ) * points[ i ].x + t * points[ ~~( i + 1 ) ].x;
					points[ i ].y = ( 1 - t ) * points[ i ].y + t * points[ ~~( i + 1 ) ].y;
				}
			}

			this.x = points[ 0 ].x;
			this.y = points[ 0 ].y;
		},

		isComplete: function() {
			return this.time >= 1;
		},

		setPercent: function( value ) {
			this.time = value;

			this.calculate();
		}

	} );

	return Bezier;

} );
