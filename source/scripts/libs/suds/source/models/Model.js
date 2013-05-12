define( [

	"suds/events/Dispatcher"

], function( Dispatcher ) {

	var Model = Dispatcher.extend( {

		collection: null,

		initialize: function( values ) {
			this._super();

			this.collection = {};

			if ( typeof values === "object" )
				this.set( values );

		},

		set: function( key, value ) {

			var previous;

			if ( typeof key === "object" ) {

				for ( var i in key ) {
					var previous = this.collection[ i ];
					var value = this.collection[ i ] = key[ i ];

					if ( previous !== value )
						this.dispatch( i , key[ i ] );
				}

			} else if ( key && typeof value !== "undefined" ) {
				previous = this.collection[ key ];
				this.collection[ key ] = value;

				if ( previous !== value )
					this.dispatch( key, value );
			}
		},

		get: function( key, closure ) {

			if ( typeof key === "undefined" ) {
				return this.collection;
			}

			if ( typeof closure === "function" ) {
				this.addListener( key, closure );
				this.dispatch( key, this.collection[ key ] );
			}

			return this.collection[ key ];
		},

		change: function( key, closure ) {
			this.addListener( key, closure );
		}

	} );

	return Model;

} );