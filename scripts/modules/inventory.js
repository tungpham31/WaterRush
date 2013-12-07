define( [ '_', 'Backbone', '$' ], function () {
	var Item = Backbone.Model.extend( {
		initialize : function ( num ) {
			alert( num );
			console.dir( this );
		}
	} );

	var Life = Item.extend( {

	} );

	var Coin = Item.extend( {

	} );

	var PowerUp = Item.extend( {

	} );

	return {
		item : Item
	};
} );