/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function StoreViewModel() {
		var self = this;

		self.entries = ko.observableArray();

		communication.send({
			'storeInfo': {
				'getFakeCoinPrices': {}
			}
		}, function (result) {
			var list = result.storeInfo.getFakeCoinPrices;
			for (entry in list) {
				self.entries.push(new EntryViewModel(list[entry].quantity, list[entry].price));
			}
		});
	
	}

	function EntryViewModel(quantity, price) {
		var self = this;

		this.quantity = quantity;
		this.price = price;

		this.getCoins = function(){
			communication.send({
				'buyCoins': {
					'buyFakeCoins': self.price
				}
			}, function (result) {
			});
		};

	}

	ko.applyBindings(new StoreViewModel());
});
