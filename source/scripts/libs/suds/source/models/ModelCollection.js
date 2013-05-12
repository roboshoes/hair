define( [

	"suds/models/Model",
	"suds/oop/Array",
	"suds/events/Dispatcher",

	"suds/utils/function.throttle"

], function( Model, Array, Dispatcher ) {

	var ModelCollection = Array.extend( {

		dispatcher: null,
		filters: null,

		initialize: function() {
			this.dispatcher = new Dispatcher();
			this.filters = [];
		},

		destroy: function( indecator ) {

			var model, filter;

			if ( typeof indecator === "number" ) {

				model = this.splice( indecator, 1 )[ 0 ];

			} else if ( typeof indecator === "object" ) {

				for (var i = 0; i < this.length; i++ ) {
					if ( this[ i ] === indecator ) {
						model = this.splice( i, 1 )[ 0 ];
						break;
					}
				}

			}

			if ( ! model ) return;

			for ( var j = 0; j < this.filters.length; j++ ) {
				filter = this.filters[ j ];

				if ( model.hasListenerFor( filter.key ) ) {
					filter.callback();
				}

				model.removeListener( filter.key, filter.callback );
			}

			this.dispatcher.dispatch( "length", this.length );

			return model;

		},

		create: function( values ) {
			var model = new Model( values );

			this.append( model );
		},

		append: function( model, prepend ) {
			var filter;

			for ( var i = 0; i < this.filters.length; i++ ) {

				filter = this.filters[ i ];
				model.get( filter.key, filter.callback );
			}

			if ( prepend ) this.unshift( model );
			else this.push( model );

			this.dispatcher.dispatch( "length", this.length );
		},

		get: function( index ) {
			return this[ index ];
		},

		empty: function() {
			while( this.length ) {
				this.destroy( 0 );
			}

			this.dispatcher.dispatch( "length", this.length );
		},

		count: function( key, value ) {
			var count = 0;

			for ( var i = 0; i < this.length; i++ ) {

				if ( this[ i ].get( key ) === value ) {
					count++;
				}
			}

			return count;
		},

		filter: function( key, callback ) {

			var model;
			var throttle = callback.throttle( 10 );

			this.filters.push( { key: key, callback: throttle } );

			for ( var i = 0; i < this.length; i++ ) {

				model = this[ i ];
				model.get( key, throttle );
			}
		},


		addListener: function( key, callback ) {
			return this.dispatcher.addListener( key, callback );
		},

		listen: function( key, callback ) {
			this.dispatcher.addListener( key, callback );

			callback( this[ key ] );

			return this[ key ];
		},

		removeListener: function( key, callback ) {
			return this.dispatcher.removeListener( key, callback );
		}

	} );

	return ModelCollection;

} );