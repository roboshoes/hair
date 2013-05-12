define( [

	"suds/events/Dispatcher"

], function( Dispatcher ) {

	var Parser = Dispatcher.extend( {

		routes: null,

		initialize: function() {
			this._super();
			this.routes = [];
		},

		// For Routes
		// :value - allows a any url-valid string (not including /) at this point
		// * - allows anything forom there on out

		addRoute: function( match, callback ) {
			if ( match.substr( -1, 1 ) !== "/" ) match += "/?";
			else match += "?";

			match = "^" + match + "$";

			match = match.split( "/" ).join( "\\/" );
			match = match.split( ":value" ).join( "([0-9a-zA-Z_-]+)" ); // digets from "0" to "9", letters from "a" to "z" and "A" to "Z" as well as "_" and "-"

			var wildcardIndex = match.indexOf( "*" );
			if ( wildcardIndex > -1 ) {
				match = match.substring( 0, wildcardIndex ) + "([\\/0-9a-zA-Z_-]*)";
			}

			var regex = new RegExp( match );

			this.routes.push( { regex: regex, closure: callback } );
		},

		match: function( path ) {

			var result, route, regex, closure, i, found = false;

			for ( i = 0; i < this.routes.length; i++ ) {
				route = this.routes[ i ];

				regex = route.regex;
				closure = route.closure;

				if ( regex.test( path ) ) {
					var matches = path.match( regex );
					matches.shift();

					closure.call( this, matches );
				}
			}

			if ( !found ) {
				this.dispatch( Parser.NOT_FOUND, path );
			}

		}

	} );

	Parser.NOT_FOUND = "Parser.NOT_FOUND";

	return Parser;

} )