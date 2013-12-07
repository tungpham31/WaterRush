define( [  'modules/gameLevel', '$', 'Backbone', '_' ], function( level ) {
	var Level = level.gameLevel;

	var Map = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	var GameLevels = Backbone.Collection.extend( {

	} );

	var MapView = Backbone.View.extend( {

	} );

	return {
		Map : Map
	};
} );