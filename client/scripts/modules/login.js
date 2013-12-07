define([ '$', 'Backbone', '_', 'gameLevel', 'store', 'newsfeed', 'leaderboard' ], function() {
	var Login = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	return {
		/**
		 * Returns a token which the server can use to retrieve and verify the user's identity.
		 */
		getToken: function () {
			
		},

		login : Login
	};
} );