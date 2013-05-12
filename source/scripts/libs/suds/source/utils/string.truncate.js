define( [

	"suds/patches/string.trim"

 ], function() {

	if ( ! String.prototype.truncate ) {

		String.prototype.truncate = function( characters, fullwords ) {
			if ( typeof fullwords === "undefined") fullwords = true;

			var string = this.substr( 0, characters ).trim();

			if ( fullwords ) string = string.substr( 0, string.lastIndexOf( " " ) ).trim();
			string += "...";

			return string;
		}

	}

	return true;
} );