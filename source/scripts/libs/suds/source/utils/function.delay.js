define( function() {

	Function.prototype.delay = function( time ) {

		var closure = this;
		var args = Array.prototype.slice.call( arguments, 0 ).slice( 1 );

		setTimeout( function() {
			closure.apply( closure, args );
		}, time );

		return this;
		
	};

	return true;

} );