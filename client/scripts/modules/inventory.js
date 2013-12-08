define( [ 'modules/store', 'modules/communication', '_', '$', 'Backbone' ], function ( store, brm ) {
	var Store = store.store,
		send = brm.send;

	var Item = Backbone.Model.extend( {
		initialize : function () {
			this.set( { imgSrc : 'images/Star.png' } );
			//Send query to BRM to get number of item
//			send( {}, function( res ) {
//				var num = res.num;
//				this.set( { number : num } );
//			} );
		},

		add : function ( num ) {
			var old = this.get( 'num' ), max = this.get( 'maxNum' );
			if( max !== undefined && old + num > max ) return false;
			//Update server
			this.set( { num : old + num } );
			return true;
		},

		remove : function ( num ){
			var old = this.get( 'num' );
			if( old - num < 0) return false;
			//Update Server
			this.set( { num : old - num } );
			return true;
		}
	} );

	var Coin = Item.extend( {
		defaults : {
			'maxNum' : undefined,
			'name' : 'coin'
		},
		initialize : function () {
			this.set( { imgSrc : 'images/coin.jpg' } );
			new CoinView( { model : this } );
		}
	} );

	var Life = Item.extend( {
		defaults : {
			'maxNum' : undefined,
			'name' : 'life'
		},
		initialize : function () {
			this.set( { imgSrc : 'images/heart.jpg' } );
			new LifeView( { model : this } );
		}
	} );

	var PowerUp = Item.extend( {
		defaults : {
			'maxNum' : undefined,
			'name' : 'powerUp'
		},
		remove : function ( num ) {
			var old = this.get( 'num' );
			if( old - num < 0 ) {
				//Open Store, then either return false or subtract one if the User bought stuff
			}	else {
				this.set( { num : old - num } );
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
			this.render();
			jQuery( '#navbar' )[0].appendChild( this.$el[0] );
		},
		template : _.template( '<img src="<%= imgSrc %>"><span id="<%= name %>Num"><%= num %></span>' ),
		render : function() {
			this.$el.html( this.template( this.model.attributes ) );
			return this;
		}
	} );

	var CoinView = ItemView.extend( {
		id : 'coinsDisplay',
		model : Coin,
		activate : function () {
			//go to the store
		}
	} );

	var LifeView = ItemView.extend( {
		id : 'livesDisplay',
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