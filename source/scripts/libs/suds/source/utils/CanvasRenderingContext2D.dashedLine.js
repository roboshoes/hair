define( function() {

	if ( CanvasRenderingContext2D && !CanvasRenderingContext2D.prototype.dashedLine ) {

		CanvasRenderingContext2D.prototype.dashedLine = function( fromX, fromY, toX, toY, dash ) {

			if ( ! dash ) dash = [ 10, 5 ];

			this.save();

				var deltaX = ( toX - fromX );
				var deltaY = ( toY - fromY );
				var length = Math.sqrt( deltaX * deltaX + deltaY * deltaY );
				var rotation = Math.atan2( deltaY, deltaX );
				var draw = true;
				var dashAmount = dash.length;
				var currentDash = 0;
				var x = 0;

				this.translate( fromX, fromY );
				this.moveTo( 0, 0 );
				this.rotate( rotation );

				while( length > x ) {
					x += dash[ currentDash++ % dashAmount ];

					if ( x > length ) x = length;

					draw ? this.lineTo( x, 0 ) : this.moveTo( x, 0 );

					draw = !draw;
				}



			this.restore();

		}
	}

	return true;

} );