var store = [
		{"name" : "freeze", "price" : "10"},
		{"name" : "boom", "price" : "5"},
		{"name" : "reQ", "price" : "15"},
		{"name" : "lives", "price" : "5"}
];

var coins = [
		{"name" : "coins", "price" : "0.2"}
];


exports.endpoints = {
	'getState': function (req, user, done) {
		/**
		 Sends the client the prices for all powerups and lives
		 */
		 done(store);
	},
};


exports.endpoints = {
	'getCoinPrices': function (req, user, done) {
		/**
		 Calculates the price for the number of coins the client sends, and sends back the amount
		 */
		 var coinPrice = req * coins[0].price; //Depending on what the client is sending in, might need to change this
		 done(coinPrice);
	},
};

exports.endpoints = {
	'getPrices': function (req, user, done) {
		/**
		Sends back the price for the specific item that client requests
		 */
		 for(var i = 0; i < store.length; i++){ //Depending on what the client is sending in, might need to change this
		 	var obj = store[i];
		 	if (req == obj.name){
		 		var price = obj.price;
		 		done(price);
		 	}
		 }
	},
};
