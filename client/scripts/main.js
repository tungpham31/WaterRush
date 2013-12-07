/**
 * This is the entry point for the application. Should probably call Login or something
 */
define( [ 'modules/login', 'modules/inventory', '_', '$' ], function( Login, inv ) {
	var coin = inv.coin;
	var c = new coin( 10 );
} );