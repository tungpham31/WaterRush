define( [ 'modules/gameLevel', 'Backbone', '_' ], function( level ) {
	var Level = level.gameLevel;

	var Map = Backbone.Model.extend( {
		initialize : function() {

		}
	} );

	var GameLevels = Backbone.Collection.extend( {
		model : Level,
		comparator : 'levelID'
	} );

	var MapView = Backbone.View.extend( {
		tagName : 'div',
		initialize : function() {
			this.listenTo( this.model, 'change', this.render );
		},
		template : _.template(''),
		render : function() {
			this.$el.html( this.template( this.model.attributes ) );
			console.dir( this.$el );
			console.dir( this.template );
			return this;
		}
	} );

	return {
		Map : Map,
		MapView : MapView
	};
} );