define( function() {

	if ( typeof Function.prototype.bind !== "function" ) {
		Function.prototype.bind = function( context ) {
			var closure = this;

			return function() {
				closure.apply( context, arguments );
			}
		};
	}

	return true;
} );