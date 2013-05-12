define( function() {

	return function( Class ) {

		var instance;

		Class.getInstance = function() {
			if ( ! instance ) {
				instance = new Class();
				instance.instantiate = function() {
					throw new Error( "Can't instantiate Class. Use getInstance instead" );
				}
			}

			return instance;
		}
	}

} );