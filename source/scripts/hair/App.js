define( [

	"suds/events/Interval",
	"suds/helpers/MouseHelper",
	"suds/math/Point",

	"hair/Hair",
	"hair/utils/polarToCartesian",
	"hair/config/options",
	"hair/config/controllers"

], function( Interval, MouseHelper, Point, Hair, polarToCartesian, options, controllers ) {

	"use strict"

	var App = function() {

		var canvas = null;
		var context = null;
		var hairs = null;

		function init() {

			Interval.addListener( Interval.FRAME, onFrame );
			MouseHelper.startTracking();

			canvas = document.getElementById( "canvas" );
			context = canvas.getContext( "2d" );

			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;

			initHair();

			controllers.amount.onFinishChange( initHair );
			controllers.type.onFinishChange( arrangeHair );
		}

		function initHair() {


			var amount = options.amount;
			var point, hair;

			hairs = [];

			for ( var i = 0; i < amount; i++ ) {
				hair = new Hair( new Point() );
				hairs.push( hair );
			}

			arrangeHair();

		}

		function arrangeHair() {

			var center = new Point( window.innerWidth / 2 , window.innerHeight / 2 );
			var amount = hairs.length;
			var i, hair, point;

			switch( options.type ) {
				case "circle":

					for ( var i = 0; i < amount; i++ ) {
						hair = hairs[ i ];
						point = polarToCartesian( Math.PI * 2 * ( i / amount ), 100 ).add( center );

						hair.setOrigin( point );
					}

					break;

				case "flat":

					var total = window.innerWidth * 3 * 0.25;
					var start = ( window.innerWidth - total ) * 0.5;
					var step = total / amount;
					var height = window.innerHeight * 0.5;

					for ( var i = 0; i < amount; i++ ) {
						hair = hairs[ i ];
						point = new Point( start + i * step, height );

						hair.setOrigin( point );
					}

					break;

				case "face":

					for ( var i = 0; i < amount; i++ ) {
						hair = hairs[ i ];
						point = polarToCartesian( Math.PI + Math.PI * ( i / ( amount - 1 )  ), 100 ).add( center );

						hair.setOrigin( point );
					}

					break;
			}
		}

		function onFrame() {
			var hair, force;

			canvas.width = canvas.width;

			for ( var i = 0; i < hairs.length; i++ ) {

				hair = hairs[ i ];

				force = Point.between( MouseHelper, hair.getOrigin() ).normalize().multiply( 20 );

				if ( options.suction ) force.flip();

				hair.setForce( force );
				hair.draw( context );
			}
		}

		init();

	}

	return App;

} );

