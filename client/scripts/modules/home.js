define( [ 'modules/map', 'modules/inventory', 'Backbone', '_', '$' ], function( map, items ) {
	var Map = map.Map, Coin = items.coin, Life = items.life;

	function showMap () {
		var map = new Map(), coin = new Coin( { num : 100 } ), life = new Life( { num : 10 } );
	}

	return {
		showMap : showMap
	};
} );