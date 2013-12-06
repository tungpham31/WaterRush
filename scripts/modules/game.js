define([ 'jQuery', 'Backbone', 'inventory' ], function() {
	preLevel = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	postLevel = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	gameLevel = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	board = Backbone.collection.extend( {
		initialize : function() {

		}
	} );

	tile = Backbone.collection.extend( {
		initialize : function() {

		}
	} );

	tileQueue = Backbone.Collection.extend( {

	} );

	score = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	powerUp = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	water = Backbone.Model.extend( {

	} );

	return {
		game : GameLevel
	};
} );