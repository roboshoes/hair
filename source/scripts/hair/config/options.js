define( [

	"dat/gui/GUI",
	"hair/config/controllers"

], function( GUI, controllers ) {

	var gui = new GUI();

	var options = {
		amount: 15,
		length: 50,
		thickness: 20,
		type: "face",
		suction: false
	};

	controllers.amount = gui.add( options, "amount", 5, 40 );
	controllers.length = gui.add( options, "length", 20, 200 );
	controllers.thickness = gui.add( options, "thickness", 4, 30 );
	controllers.type = gui.add( options, "type", [ "face", "circle", "flat" ] );
	controllers.suction = gui.add( options, "suction" );

	return options;

} );