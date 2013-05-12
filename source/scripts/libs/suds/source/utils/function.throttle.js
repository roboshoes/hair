define( function() {

	Function.prototype.throttle = function( delay ) {
		var timeout;
		var self = this;
		
		return function() {
			clearTimeout( timeout );
			timeout = setTimeout( self, delay );
		}
	}

} );