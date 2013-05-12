define( [

	"suds/events/Dispatcher"

], function( Dispatcher ) {

	var CanvasElement = Dispatcher.extend( {

		children: null,

		initialize: function() {
			this.children = [];
		},

		addChild: function( child ) {
			this.children.push( child );
		},

		update: function( child ) {
			this.loop( "update" );
		},

		draw: function( context ) {
			this.loop( "draw", context );
		},

		loop: function( functionName, arguments ) {
			var child, length = this.children.length;

			for ( var i = 0; i < length; i++ ) {
				child = this.children[ i ];
				child[ functionName ].apply( child, arguments );
			}
		}

	} );

	return CanvasElement;

} );
