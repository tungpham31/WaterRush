/**
 * Created by Timm on 12/6/13.
 */
define( [ 'modules/inventory', '_', 'Backbone', '$' ], function ( inventory ) {
	var PowerUp = inventory.powerUp;

	var Boom = PowerUp.extend( {
		activate : function () {

		}
	} );

	var Freeze = PowerUp.extend( {
		activate : function () {

		}
	} );

	var ReQ = PowerUp.extend( {
		activate : function () {

		}
	} );
	return {
		Boom : Boom,
		Freeze : Freeze,
		ReQ : ReQ
	};
} );