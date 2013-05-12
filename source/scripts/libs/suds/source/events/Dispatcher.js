define( [

	"suds/oop/Class"

], function( Class ) {

	"use strict"

	var Dispatcher = Class.extend(  {

		listeners: null,

		initialize: function() {
			this.listeners = [];
		},

		addListener: function( name, closure ) {
			this.removeListener( name, closure );

			this.listeners.push( { name: name, closure: closure } );
		},

		removeListener: function( name, closure ) {
			var listener,
			    i = 0,
			    length = this.listeners.length;

			for (; i < length; i++ ) {
				listener = this.listeners[ i ];

				if ( listener.name === name && listener.closure === closure ) {
					this.listeners.splice( i, 1 );
					i--;
					length--;
				}
			}
		},

		dispatch: function( name, event ) {
			var listener,
			    i = 0,
			    length = this.listeners.length;

			for (; i < length; i++ ) {
				listener = this.listeners[ i ];

				if ( !listener ) continue;

				if ( listener.name === name ) {
					listener.closure.call( null, event );
				}
			}
		},

		hasListenerFor: function( name ) {
			var listener,
			    i = 0,
			    length = this.listeners.length;

			for (; i < length; i++ )
				if ( this.listeners[ i ].name === name ) return true;

			return false;
		},

		hasListeners: function() {
			return this.listeners.length > 0;
		},

		removeAllListeners: function() {
			this.listeners = [];
		}

	} );

	return Dispatcher;

} );