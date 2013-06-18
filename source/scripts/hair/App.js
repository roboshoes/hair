define( [

	"suds/events/Interval",
	"suds/helpers/MouseHelper",
	"suds/math/Point",

	"hair/Hair",
	"hair/utils/polarToCartesian",
	"hair/utils/circleOrder",
	"hair/utils/faceOrder",
	"hair/utils/linear",
	"hair/config/options",
	"hair/config/controllers"

], function( Interval, MouseHelper, Point, Hair, polarToCartesian, circleOrder, faceOrder, linear, options, controllers ) {

	"use strict"

	var App = function() {

		var canvas = null;
		var context = null;
		var hairs = null;
		var stageWidth = 0;
		var stageHeight = 0;

		function init() {

			Interval.addListener( Interval.FRAME, onFrame );
			MouseHelper.startTracking();

			canvas = document.getElementById( "canvas" );
			context = canvas.getContext( "2d" );

			stageWidth = canvas.width = window.innerWidth;
			stageHeight = canvas.height = window.innerHeight;

			initHair();

			controllers.amount.onFinishChange( initHair );
			controllers.type.onFinishChange( arrangeHair );

			window.addEventListener( "resize", function() {
				stageWidth = canvas.width = window.innerWidth;
				stageHeight = canvas.height = window.innerHeight;
				arrangeHair();
			} );
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

			var center = new Point( stageWidth / 2 , stageHeight / 2 );
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

					var total = stageWidth * 3 * 0.25;
					var start = ( stageWidth - total ) * 0.5;
					var step = total / amount;
					var height = stageHeight * 0.5;

					for ( var i = 0; i < amount; i++ ) {
						hair = hairs[ i ];
						point = new Point( start + i * step, height );

						hair.setOrigin( point );
					}

					break;

				case "face":
					var angle;

					for ( var i = 0; i < amount; i++ ) {
						hair = hairs[ i ];
						angle = - Math.PI * 0.1 - Math.PI * 0.8 * ( i / ( amount - 1 ) );
						point = polarToCartesian( angle, 100 ).add( center );

						hair.setOrigin( point );
					}

					break;
			}
		}

		function onFrame() {

			canvas.width = stageWidth;

			var center = new Point( stageWidth / 2 , stageHeight / 2 );
			var mouseVector = Point.between( MouseHelper, center );
			var angle = Math.atan2( mouseVector.y, mouseVector.x );
			var percent = ( Math.PI + angle ) / ( Math.PI * 2 );
			var pivot, orderHairs;

			if ( options.type === "face" ) {

				drawFace();

				if ( percent > 0.5 && percent < 1 ) {
					percent = linear( percent, 0.5, 1 );
					pivot = ~~( ( 1 - percent ) * ( hairs.length - 1 ) );
				} else {
					percent = linear( percent, 0, 0.5 );
					pivot = ~~( percent * ( hairs.length - 1 ) );
				}

				orderHairs = faceOrder( hairs, pivot );

			} else {

				pivot = ~~( percent * ( hairs.length - 1 ) );
				orderHairs = circleOrder( hairs, pivot );

			}

			var hair, force;

			for ( var i = 0, length = orderHairs.length; i < length; i++ ) {

				hair = orderHairs[ i ];
				force = Point.between( MouseHelper, hair.getOrigin() ).normalize().multiply( 20 );

				if ( options.suction ) force.flip();

				hair.setForce( force );
				hair.draw( context );
			}
		}

		function drawFace() {
			context.beginPath();
			context.strokeStyle = "rgb( 0, 0, 0 )";
			context.fillStyle = "rgb( 255, 255, 255 )";
			context.lineWidth = 2;
			context.arc( stageWidth / 2, stageHeight / 2, 100, 0, Math.PI, true );
			context.closePath();
			context.fill();
			context.stroke();

			context.beginPath();
			context.fillStyle = "rgb( 0, 0, 0 )";
			context.arc( stageWidth / 2 - 30, stageHeight / 2 - 20, 7, 0, Math.PI * 2 );
			context.closePath();
			context.fill();

			context.beginPath();
			context.fillStyle = "rgb( 0, 0, 0 )";
			context.arc( stageWidth / 2 + 30, stageHeight / 2 - 20, 7, 0, Math.PI * 2 );
			context.closePath();
			context.fill();

			context.beginPath();
			context.moveTo( 0, stageHeight / 2 );
			context.lineTo( stageWidth, stageHeight / 2 );
			context.stroke();

			context.fillStyle = "rgb( 255, 255, 255 )";
			drawLeftHand();
			drawRightHand();
		}

		function drawLeftHand() {
			var x = stageWidth / 2 - 200;

			drawFinger( x );
			drawFinger( x + 15 );
			drawFinger( x + 30 );
		}

		function drawRightHand() {
			var x = stageWidth / 2 + 200;

			drawFinger( x );
			drawFinger( x - 15 );
			drawFinger( x - 30 );
		}

		function drawFinger( x ) {
			context.beginPath();
			context.arc( x, stageHeight / 2, 10, 0, Math.PI * 2 );
			context.closePath();
			context.fill();
			context.stroke();
		}

		init();

	}

	return App;

} );

