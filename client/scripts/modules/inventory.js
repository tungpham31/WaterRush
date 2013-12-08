define( [ 'modules/store', '_', 'Backbone', '$' ], function ( Store ) {
	var Item = Backbone.Model.extend( {
		initialize : function ( num ) {
			this.set( { number : num } );
		},

		add : function ( num ) {
			var old = this.get( 'num' ), max = this.get( 'maxNum' );
			if( max !== undefined && old + num > max ) return false;
			this.set( { number : old + num } );
			return true;
		},

		remove : function ( num ){
			var old = this.get( 'num' );
			if( old - num < 0) return false;
			this.set( { number : old - num } );
			return true;
		},

		sync : function (  ) {

		}
	} );

	var Coin = Item.extend( {
		defaults : {
			'maxNum' : undefined
		}
	} );

	var Life = Item.extend( {
		defaults : {
			'maxNum' : undefined
		}
	} );

	var PowerUp = Item.extend( {
		defaults : {
			'maxNum' : undefined
		},
		remove : function ( num ) {
			var old = this.get( 'num' );
			if( old - num < 0 ) {
				//Open Store, then either return false or subtract one if the User bought stuff
			}	else {
				this.set( { number : old - num } );
				return true;
			}
		}
	} );

	var ItemView = Backbone.View.extend( {
		tagName : 'span',
		events : {
			'click' : 'activate'
		},
		initialize : function() {
			this.listenTo( this.model, 'change', this.render );
		},
		template : _.template( '<img src="<%= imgSrc %>"><span id="<%= model %>Num"><%= num %></span>' ),
		render : function() {
			this.$el.html( this.template( this.model.attributes ) );
			return this;
		}
	} );

	var CoinView = ItemView.extend( {
		id : 'coinsDisplay',
		imgSrc : 'coin.jpg',
		model : Coin,
		activate : function () {
			//go to the store
		}
	} );

	var LifeView = ItemView.extend( {
		id : 'livesDisplay',
		imgSrc : 'heart.jpg',
		model : Life,
		activate : function () {
			//go to the store
		}
	} );

	return {
		item : Item,
		itemView : ItemView,
		coin : Coin,
		life : Life,
		powerUp : PowerUp
	};
} );