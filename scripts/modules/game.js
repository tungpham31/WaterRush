define([ 'jQuery', 'Backbone', '_' ], function() {
	gameLevel = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	return {
		game : gameLevel
	};
} );