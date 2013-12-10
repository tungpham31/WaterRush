var store = [
		{"name" : "freeze", "price" : "10"},
		{"name" : "boom", "price" : "5"},
		{"name" : "req", "price" : "15"},
		{"name" : "lives", "price" : "5"}
];

var coins = [
		{"quantity" : "20", "price" : "2"},
		{"quantity" : "50", "price" : "4"},
		{"quantity" : "100", "price" : "8"}
];


exports.endpoints = {
	'getState': function (req, user, done) {
		/**
		 Sends the client the prices for all powerups and lives
		 */
		 done(store);
	},
	'getCoinPrices': function (req, user, done) {
		/**
		 Calculates the price for the number of coins the client sends, and sends back the amount
		 */
		 var coinPrice = req * coins[0].price; //Depending on what the client is sending in, might need to change this
		 done(coinPrice);
	},
	'getPrices': function (req, user, done) {
		/**
		Sends back the price for the specific item that client requests
		 */
		 for(var i = 0; i < store.length; i++){ //Depending on what the client is sending in, might need to change this
		 	var obj = store[i];
		 	if (req.toLowerCase() == obj.name.toLowerCase()){
		 		var price = obj.price;
		 		done(price);
		 	}
		 }
	},

	'getFakeCoinPrices' : function (req, user, done){
		done(coins);
	},
};

/**
 * Internal function for other server-side services to call. Returns the powerups and price.
 */
exports.getItems = function(){
	return store;
};
