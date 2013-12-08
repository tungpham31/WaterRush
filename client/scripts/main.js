/**
 * This is the entry point for the application. Should probably call Login or something
 */
define( [ 'modules/login', 'modules/home', '_', '$' ], function( Login, home ) {
	var show = home.showMap;
	show();
} );