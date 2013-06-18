define( [

	"suds/math/Point",

	"hair/Joint",
	"hair/utils/bezier",
	"hair/utils/reverse",
	"hair/config/options"

], function( Point, Joint, bezier, reverse, options ) {

	var Hair = function( origin ) {

		var joints = [];
		var thickness = 25;
		var force = new Point();

		function init() {

			var joint;
			var amount = 5;

			for ( var i = 0; i < amount; i++ ) {
				joint = new Joint( joint, ( ( amount - i ) / amount ) );
				joint.force = force;

				joints.push( joint );
			}

			joints[ 0 ].successor = joints[ 1 ];
		}

		this.draw = function( context ) {

			var length = joints.length;
			var first = joints[ 0 ];

			context.save();

				context.beginPath();
				context.strokeStyle = "rgb( 0, 0, 0 )";
				context.fillStyle = options.color;
				context.lineWidth = 2;
				context.translate( origin.x, origin.y );

				for ( var i = 0; i < length; i++ ) {
					joints[ i ].update();
				}

				context.moveTo( first.top.x, first.top.y );

				bezier( joints, context, "top" );
				bezier( reverse( joints ), context, "bottom" );

				var topBetween = Point.between( first, first.top );
				var bottomBetween = Point.between( first, first.bottom );

				context.arc(
					first.x,
					first.y,
					options.thickness,
					Math.atan2( bottomBetween.y, bottomBetween.x ),
					Math.atan2( topBetween.y, topBetween.x ),
					true
				);

				context.closePath();
				context.fill();
				context.stroke();

			context.restore();

		}

		this.getOrigin = function() {
			return origin;
		}

		this.setOrigin = function( value ) {
			origin.set( value );
		}

		this.setForce = function( value ) {
			force.set( value );
		}

		init();
	}

	return Hair;

} );
