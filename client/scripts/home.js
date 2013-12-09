/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function HomeViewModel() {
		var self = this;

		self.coins = ko.observable(200);
		self.lives = ko.observable(30);

		communication.send({
			'inventory': {
				'getFakeCoins': {},
				'getFakeLives': {}
			}
		}, function (result) {
			self.coins(result.inventory.getFakeCoins);
			self.lives(result.inventory.getFakeLives);
		});
	
	}

	ko.applyBindings(new HomeViewModel());
});
