define( [

	"suds/routing/History",
	"suds/routing/Parser",

	"suds/patches/function.bind"

], function( History, Parser ) {

	var instance = null,
	    allowInstantiation = false,
	    history = History.getInstance();

	var Router = Parser.extend( {

		initialize: function() {
			this._super();

			if ( !allowInstantiation )
				throw new Error( "Router cannot be instantiated. User Router.getInstance() instead" );

			history.addListener( History.CHANGED, this.onHistoryChanged.bind( this ) );
		},

		onHistoryChanged: function( path ) {
			this.match( path );
		},

		set: function( path ) {
			if ( path === this.get() ) {
				this.onHistoryChanged( path );
				return;
			}

			history.set( path );
		},

		get: function() {
			return history.get();
		},

		getTopLevel: function() {
			return this.getLevel( 0 );
		},

		getLevel: function( index ) {
			var values = this.get().split( "/" );

			if ( values.length > index )
				return values[ index ];

			return null;
		},

		setRoot: function( root ) {
			history.setRoot( root );
		},

		useHash: function( value ) {
			history.useHash( value );
		}

	} );

	Router.getInstance = function() {
		if ( !instance ) {
			allowInstantiation = true;
			instance = new Router();
			allowInstantiation = false;
		}

		return instance;
	}

	Router.NOT_FOUND = Parser.NOT_FOUND;

	return Router;

} );