/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function LeaderboardViewModel() {
		var self = this;

		self.entries = ko.observableArray();

		communication.send({
			'leaderBoard': {
				'getFakeScores': {}
			}
		}, function (result) {
			var list = result.leaderBoard.getFakeScores;
			for (friend in list) {
				self.entries.push(new EntryViewModel(friend, list[friend]));
			}
		});
	
	}

	function EntryViewModel(name, score) {
		var self = this;

		this.name = name;
		this.score = score;
	}

	ko.applyBindings(new LeaderboardViewModel());
});