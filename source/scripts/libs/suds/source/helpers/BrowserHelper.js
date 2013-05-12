define( function() {

	var BrowserHelper = {};

	function onResize() {
		BrowserHelper.width = window.innerWidth;
		BrowserHelper.height = window.innerHeight;
	}

	window.addEventListener( "resize", onResize );

	BrowserHelper.width = window.innerWidth;
	BrowserHelper.height = window.innerHeight;

	BrowserHelper.webgl = ( function() {
		try { return !! window.WebGLRenderingContext && !! document.createElement( "canvas" ).getContext( "experimental-webgl" ); }
		catch( e ) { return false; };
	} )();

	BrowserHelper.canvas = ( function() {
		var element = document.createElement( "canvas" );
		return !!( element.getContext && element.getContext( "2d" ) );
	} )();

	BrowserHelper.pushstate = ( function() {
		return window.history && window.history.pushState;
	} )();

	BrowserHelper.csstransforms3d = ( function() {
		return 'WebkitPerspective' in document.body.style || 'MozPerspective' in document.body.style || 'msPerspective' in document.body.style || 'OPerspective' in document.body.style || 'perspective' in document.body.style;
	} )();

	return BrowserHelper;

} );