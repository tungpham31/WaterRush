/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function NewsfeedViewModel() {
		var self = this;

		self.entries = ko.observableArray();

		communication.send({
			'notifications': {
				'getFakeNotifications': {}
			}
		}, function (result) {
			var list = result.notifications.getFakeNotifications;
			for (notify in list) {
				self.entries.push(new EntryViewModel(list[notify].notification));
			}
		});
	
	}

	function EntryViewModel(notification) {
		var self = this;

		this.notification = notification;
	}

	ko.applyBindings(new NewsfeedViewModel());
});