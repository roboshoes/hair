define( [

	"suds/oop/Class"

], function( Class ) {

	var Point = Class.extend( {

		x: 0,
		y: 0,

		initialize: function( x, y ) {
			this.x = x || 0;
			this.y = y || 0;
		},

		add: function( point ) {
			this.x += point.x;
			this.y += point.y;

			return this;
		},

		subtract: function( point ) {
			this.x -= point.x;
			this.y -= point.y;

			return this;
		},

		multiply: function( factor ) {
			this.x *= factor;
			this.y *= factor;

			return this;
		},

		divide: function( factor ) {
			this.x /= factor;
			this.y /= factor;

			return this;
		},

		clone: function() {
			return new Point( this.x, this.y );
		},

		length: function() {
			return Math.sqrt( this.x * this.x + this.y * this.y );
		},

		normalize: function() {
			return this.divide( this.length() );
		},

		set: function( point ) {
			this.x = point.x;
			this.y = point.y;

			return this;
		},

		rotate: function( angle ) {
			var cos = Math.cos( angle );
			var sin = Math.sin( angle );

			var x = this.x * cos - this.y * sin;
			var y = this.y * cos + this.x * sin;

			this.x = x;
			this.y = y;

			return this;
		},

		flip: function() {
			this.x *= -1;
			this.y *= -1;

			return this;
		}

	} );

	Point.subtract = function( a, b ) {
		return a.clone().subtract( b );
	}

	Point.add = function( a, b ) {
		return a.clone().add( b );
	}

	Point.distance = function( a, b ) {
		var x = a.x - b.x;
		var y = a.y - b.y;

		return Math.sqrt( x * x + y * y );
	}

	Point.between = function( a, b ) {
		return new Point(
			b.x - a.x,
			b.y - a.y
		);
	}

	return Point;

} );
