define([ 'jQuery', 'Backbone', '_', 'brm', 'modules/game/preLevel' ], function() {
	var gameLevel = Backbone.Model.extend( {
		initialize : function( levelID ) {

		}
	} );

	return {
		gameLevel : gameLevel
	};
} );