
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
		},

		requirejs: {
			compile: {
				options: {
					baseUrl: "source/scripts",
					out: "source/scripts/min.js",
					name: "main",
					include: "requireJS",
					inlineText: true,

					paths: {
						requireJS: "libs/require/require",
						suds: "libs/suds/source",
						dat: "libs/dat",
						text: "libs/require/plugin.text"
					}
				}
			}
		}

	} );

	grunt.loadNpmTasks( "grunt-contrib-compass" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-requirejs" );
};
