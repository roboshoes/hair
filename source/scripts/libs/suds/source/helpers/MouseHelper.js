define( [

	"suds/events/Dispatcher",
	"suds/events/Interval"

], function( Dispatcher, Interval ) {

	var MouseHelper =  {};
	var dispatcher = new Dispatcher();
	var storeX = -1;
	var storeY = -1;

	MouseHelper.x = -1;
	MouseHelper.y = -1;


	MouseHelper.startTracking = function() {
		window.addEventListener( "mousemove", onMouseMove );
	}

	MouseHelper.stopTracking = function() {
		window.removeEventListener( "mousemove", onMouseMove );

		MouseHelper.x = -1;
		MouseHelper.y = -1;
	}

	MouseHelper.addListener = function( name, closure ) {

		if ( name === MouseHelper.MOUSE_MOVE ) {
			MouseHelper.startTracking();
			Interval.addListener( Interval.FRAME, onFrame );
		}

		dispatcher.addListener( name, closure );
	}

	MouseHelper.removeListener = function( name, closure ) {
		dispatcher.removeListener( name, closure );

		var found = false;

		for ( var i = 0; i < dispachter.listeners.length; i++ ) {
			if ( dispachter.listeners[ i ].name === MouseHelper.MOUSE_MOVE ) found = true;
		}

		if ( found === false ) {
			MouseHelper.stopTracking();
			Interval.removeListener( Interval.FRAME, onFrame );
		}
	}

	var onMouseMove = function( event ) {
		MouseHelper.x = event.clientX;
		MouseHelper.y = event.clientY;
	}

	var onFrame = function( event ) {
		if ( MouseHelper.x !== storeX || MouseHelper.y !== storeY ) {
			dispatcher.dispatch( MouseHelper.MOUSE_MOVE );
		}

		storeX = MouseHelper.x;
		storeY = MouseHelper.y;
	}

	MouseHelper.MOUSE_MOVE = "MouseHelper.MOUSE_MOVE";

	return MouseHelper;
} );