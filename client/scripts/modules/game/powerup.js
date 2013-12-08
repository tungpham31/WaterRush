/**
 * Created by Timm on 12/6/13.
 */
define( [ 'modules/inventory', '_', 'Backbone', '$' ], function ( inventory ) {
	var PowerUp = inventory.powerUp,
		ItemView = inventory.itemView;

	var Boom = PowerUp.extend( {

	} );

	var Freeze = PowerUp.extend( {

	} );

	var ReQ = PowerUp.extend( {

	} );

	var PowerUpView = ItemView.extend( {
		template : _.template( '<span class="powerUpView" id="<%= model %>Num"><%= num %></span>' )
	} );

	var BoomView = PowerUpView.extend( {
		model : Boom,
		imgSrc : 'boom.jpg'
	} );

	var FreezeView = PowerUpView.extend( {
		model : Freeze,
		imgSrc : 'freeze.jpg'
	} );

	var ReQView = PowerUpView.extend( {
		model : ReQ,
		imgSrc : 'reQ.jpg'
	} );

	return {
		Boom : Boom,
		Freeze : Freeze,
		ReQ : ReQ
	};
} );