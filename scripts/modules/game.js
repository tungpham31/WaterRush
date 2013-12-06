define([ 'jQuery', 'Backbone', 'inventory' ], function() {
	gameLevel = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	return {
		game : gameLevel
	};
} );