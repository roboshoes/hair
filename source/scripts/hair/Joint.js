define( [

	"suds/math/Point",
	"suds/ui/Motion",
	"hair/config/options"

], function( Point, Motion, options ) {

	var Joint = Point.extend( {

		predecessor: null,
		force: null,
		distance: null,
		motion: null,
		successor: null,

		initialize: function( predecessor, index ) {

			var x, y;

			this.predecessor = predecessor;
			this.index = index;
			this.distance = options.length;
			this.motion = new Motion( 5, 2, 10 );

			if ( predecessor ) {
				x = predecessor.x + this.distance;
				y = predecessor.y;
			} else {
				x = 0;
				y = 0;
			}

			this._super( x, y );

			this.top = new Point().set( this );
			this.bottom = new Point().set( this );
		},

		update: function() {

			var thickness = this.index * options.thickness;

			if ( this.successor ) {

				var between = Point.between( this, this.successor ).normalize().multiply( thickness );

				this.top = between.clone().rotate( Math.PI / 2 );
				this.bottom = between.clone().rotate( - Math.PI / 2 );

				return;
			}

			if ( ! this.predecessor ) return;

			this.motion.update();

			var useForce = this.force.clone().add( this.motion.getPosition() );

			this.add( useForce );

			var between = Point.between( this.predecessor, this ).normalize()
			var stretch = between.clone().multiply( options.length );
			var target = this.predecessor.clone().add( stretch );

			this.x = target.x;
			this.y = target.y;

			this.top = this.clone().add( between.clone().multiply( thickness ).rotate( Math.PI / 2 ) );
			this.bottom = this.clone().add( between.clone().multiply( thickness ).rotate( - Math.PI / 2 ) );
		}

	} );

	return Joint;

} );

