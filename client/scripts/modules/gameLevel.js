define( [ 'modules/communication', 'modules/game/preLevel', '$', 'Backbone', '_' ], function( brm, preLevel ) {
	var GameLevel = Backbone.Model.extend( {
		initialize : function( levelID ) {
			this.set( { levelID : levelID } );
			new GameLevelView( { model : this } );
		},
		unlock : function() {
			this.set( { status : 'unlocked' } );
		},
		success : function( score ) {
			this.set( { score : score } );
		},
		loss : function() {

		}
	} );

	var GameLevelView = Backbone.View.extend( {
		tagName : 'span',
		initialize : function() {
			this.listenTo( this.model, 'change', this.render );
		},
		template : _.template( '<span id="<%= id %>" class="<%= status %>"></span>' ),
		render : function() {
			this.$el.html( this.template( this.model.attributes ) );
			return this;
		}
	} );

	return {
		gameLevel : GameLevel
	};
} );