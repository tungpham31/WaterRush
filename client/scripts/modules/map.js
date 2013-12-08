define( [ 'modules/gameLevel', 'Backbone', '_' ], function( level ) {
	var Level = level.gameLevel;

	var GameLevels = Backbone.Collection.extend( {
		model : Level,
		comparator : 'levelID'
	} );

	var Map = Backbone.Model.extend( {
		levels : new GameLevels(),
		initialize : function() {
			for ( var i = 1; i < 9; i++ ){
				this.levels.add( new Level( { levelID : i } ), { at : i } )
				this.levels.at( i );
			}
		}
	} );

	var MapView = Backbone.View.extend( {
		tagName : 'div',
		initialize : function() {
			this.listenTo( this.model, 'change', this.render );
		},
		template : _.template(''),
		render : function() {
			this.$el.html( this.template( this.model.attributes ) );
			return this;
		}
	} );

	return {
		Map : Map,
		MapView : MapView
	};
} );