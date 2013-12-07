define([ 'jQuery', 'Backbone', 'game', 'store', 'newsfeed', 'leaderboard' ], function() {
	Map = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	return {
		Map : Map
	};
} );
