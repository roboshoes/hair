
"use strict";

module.exports = function( grunt ) {

	grunt.initConfig( {

		compass: {
			dev: {
				options: {
					sassDir: "source/styles/scss",
					cssDir: "source/styles/css"
				}
			}
		},

		watch: {
			dev: {
				files: [ "source/styles/scss/**" ],
				tasks: [ "compass:dev" ],
				options: {
					debounceDelay: 150
				}
			}
		}

	} );

	grunt.loadNpmTasks( "grunt-contrib-compass" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
};
