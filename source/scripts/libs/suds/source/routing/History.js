define( [

	"suds/events/Dispatcher",

	"suds/patches/function.bind"

], function( Dispatcher ) {

	var instance = null;
	var allowInstantiation = false;
	var history = window.history;
	var location = window.location;
	var support = !!( history && history.pushState );
	var hash = "#!/";

	var History = Dispatcher.extend( {

		initialPopped: false,
		trackHash: true,
		root: "",

		initialize: function() {
			if ( !allowInstantiation ) {
				throw new Error( "History is a Singleton and cannot be instantiated. Use History.getInstance() instead." );
			}

			this._super();

			this.initialPopped = false;
			this.trackHash = true;
			this.root = "";

			if ( support ) window.addEventListener( "popstate", this.onPopState.bind( this ) );
			else window.onhashchange = this.onHashChange.bind( this );
		},

		onPopState: function( event ) {
			if ( !support ) return;
			this.initialPopped && this.dispatch( History.CHANGED, this.get() );
			this.initialPopped = true;
		},

		onHashChange: function() {
			if ( this.trackHash ) this.dispatch( History.CHANGED, this.get() );
		},

		set: function( path ) {
			trackHash = false;

			if ( path && path[ 0 ] === "/" ) path = path.substr( 1 );

			if ( support ) {
				history.pushState( { path: path }, "", this.root + path );
			} else {
				location.href = hash + path;
			}

			trackHash = true;

			if ( support ) this.dispatch( History.CHANGED, path );
		},

		get: function() {
			var href = location.href;
			var path = "";

			// finds anything after the first slash in a url. Not inluding the double slash after protocol.
			// for example: http://www.mathias-paumgarten.com/entry/23434/new
			//                                                ^^^^^^^^^^^^^^^
			var supportRegexp = /[a-zA-Z]+:\/\/[-\w._]+\/([\w-_\/!]+)/;

			// finds anything after the hash value. Usually #!/
			// for example: http://www.mathias-paumgarten.com/#!/entry/23434/new
			//                                                   ^^^^^^^^^^^^^^^
			var fallbackRegexp = /#!\/([-_\w\/]+)/;

			if ( support ) {

				if ( supportRegexp.test( href ) )
					path = href.match( supportRegexp )[ 1 ];

				if ( this.root.length > 0 ) {
					var delimiter = this.root;

					if ( delimiter[ 0 ] === "/" )
						delimiter = delimiter.substr( 1 );

					path = path.split( delimiter ).join( "" );
				}

			} else {

				if ( fallbackRegexp.test( href ) )
					path = href.match( fallbackRegexp )[ 1 ];
			}

			return path;
		},

		getProtocol: function() {
			// regexp: any string that comes before the "://"
			// for example http, https, file. etc.

			return location.href.match( /(\w+):\/\// )[ 1 ];
		},

		setRoot: function( value ) {
			// if called without parameter it uses the the current pathname.

			if ( typeof value === "string" ) this.root = value;
			else {
				if ( !!location[ "pathname" ] ) this.root = location.pathname;

				// finds same as pathname. Everything after (including) the slash after the domain until # if exists
				else this.root = location.href.match( /[a-zA-Z]+:\/\/[-_\w.]+(\/[-\w_\/!]+)/ )[ 1 ];
			}
		},

		getRoot: function() {
			return this.oot;
		},

		useHash: function( value ) {

			if ( support && value == true ) {
				window.removeEventListener( "popstate", this.onPopState.bind( this ) );
				window.onhashchange = this.onHashChange.bind( this );
			} else if ( value == true ) {
				window.onhashchange = this.onHashChange.bind( this );
			}

			support = !value;
		}

	} );

	History.getInstance = function() {
		if ( !instance ) {
			allowInstantiation = true;
			instance = new History();
			allowInstantiation = false;
		}

		return instance;
	}

	History.CHANGED = "History.CHANGED";

	return History;

} );