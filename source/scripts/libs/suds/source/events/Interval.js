define( [

	"suds/events/Dispatcher",
	"suds/patches/function.bind"

], function( Dispatcher ) {

	var FRAME = "FRAME";

	var animationFrame = ( function() {
		return  window.requestAnimationFrame       || 
		        window.webkitRequestAnimationFrame || 
		        window.mozRequestAnimationFrame    || 
		        window.oRequestAnimationFrame      || 
		        window.msRequestAnimationFrame     || 
		        function( callback ){
		        	window.setTimeout(callback, 1000 / 60);
		        };
	} )();

	var Interval = Dispatcher.extend( {

		FRAME: FRAME,
		
		initialize: function() {
			this._super();
			this.loop();
		},

		loop: function() {
			this.dispatch( FRAME );

			animationFrame( this.loop.bind( this ) );
		}

	} );

	var interval = new Interval();
	interval.FRAME = FRAME;

	return interval;

} );