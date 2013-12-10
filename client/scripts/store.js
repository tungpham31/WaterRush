/**
 * This is the entry point for the application. Should probably call Login or something
 */
define([ 'knockout', 'modules/communication' ], function(ko, communication) {
	function StoreViewModel() {
		var self = this;

		self.inventoryEntries = ko.observableArray();
		self.coinEntries = ko.observableArray();

		communication.send({
			'storeInfo': {
				'getState': {},
				'getFakeCoinPrices': {}
			}
		}, function (result) {
			var list = result.storeInfo.getState;
			for (entry in list) {
				self.inventoryEntries.push(new InventoryEntryViewModel(list[entry].name, list[entry].price));
			}

			list = result.storeInfo.getFakeCoinPrices;
			for (entry in list) {
				self.coinEntries.push(new CoinEntryViewModel(list[entry].quantity, list[entry].price));
			}
		});
	
	}

	function InventoryEntryViewModel(name, price) {
		var self = this;

		this.name = name;
		this.price = price;
	}

	function CoinEntryViewModel(quantity, price) {
		var self = this;

		this.quantity = quantity;
		this.price = price;

		this.getCoins = function(){
			communication.send({
				'buyCoins': {
					'buyFakeCoins': self.quantity
				}
			}, function (result) {
			});
		};

	}

	ko.applyBindings(new StoreViewModel());
});
