/* Calculate ratio for scaling to fill and fit */

define( function() {

	var RatioHelper = {};

	// Given original size and bonding container, 
	// return new dimensions and position to fill

	RatioHelper.scaleToFill = function( original, container ) {
		var originalRatio = original.w / original.h;
		var containerRatio = container.w / container.h;

		var _left, _top, _width, _height;

		if (originalRatio > containerRatio) {
			_height = container.h;
			_width = Math.round( container.w * (originalRatio) );
			_left = Math.round( (container.w - _width) / 2 );
			_top = 0;
		} else {
			_width = container.w;
			_height = Math.round( container.h * originalRatio );
			_left = 0;
			_top = Math.round( (container.h - _height) / 2 );
		}

		return { left: _left, top: _top, width: _width, height: _height };
	}

	return RatioHelper;

} );