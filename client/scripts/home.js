/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function HomeViewModel() {
		var self = this;

		self.coins = ko.observable(0);
		self.lives = ko.observable(0);
		self.notifications = ko.observable(0);

		communication.send({
			'inventory': {
				'getFakeCoins': {},
				'getFakeLives': {}
			},
			'notifications': {
				'getFakeNotifications': {}
			}
		}, function (result) {
			self.coins(result.inventory.getFakeCoins);
			self.lives(result.inventory.getFakeLives);
			self.notifications(result.notifications.getFakeNotifications.length);
		});
	
	}

	ko.applyBindings(new HomeViewModel());
});
