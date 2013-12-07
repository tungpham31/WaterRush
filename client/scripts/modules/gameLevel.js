define( [ '$', 'Backbone', '_', 'modules/brm', 'modules/game/preLevel' ], function() {
	var GameLevel = Backbone.Model.extend( {
		initialize : function( levelID ) {
			this.set( { levelID : levelID } );
		}
	} );

	var GameLevelView = Backbone.View.extend( {

	} );

	return {
		gameLevel : GameLevel
	};
} );