define([ '$', 'Backbone', '_' ], function() {
	var Newsfeed = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	return {
		newsfeed : Newsfeed
	};
} );