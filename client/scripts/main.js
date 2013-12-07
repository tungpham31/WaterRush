/**
 * This is the entry point for the application. Should probably call Login or something
 */
define( [ 'modules/login', 'modules/map', '_', '$' ], function( Login, Map ) {
	var map = new Map.Map(), mapView = new Map.MapView( { model : map } );
	console.dir( map );
	map.set( { num : 10 } );
	console.dir( mapView.$el );
	$( 'body' ).append( mapView.$el );
} );