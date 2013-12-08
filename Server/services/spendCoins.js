var drs = require('../drs.js');
var dtm = require('../dtm.js');
var storeInfo = require('./storeInfo.js');

exports.endpoints = {
	'spendCoins': function (req, user, done) {
		/**
		 {"item" : "freeze", "quantity" : "2"}
		 */
		 drs.getCoins(user.id, function(err,result){
		 	var coins = result;

		 		var totalCost = totalPurchaseCost(req.item, req.quantity, coins);
		 		if(totalCost){
		 			if (req.item == "lives"){
		 				dtm.start().coins(user.id, -totalCost)
		 						   .lives(user.id, req.quantity)
		 						   .commit(done);
		 			}
		 			else{
		 			    dtm.start().coins(user.id, -totalCost)
		 						   .item(user.id, req.item, req.quantity)
		 						   .commit(done);	
		 			}
		 		}
		 	});

	},
};

/**
 * Returns total cost for purchase if user has enough coins.
 * returns false if user does not have enough coins.
 */
function totalPurchaseCost(item, quantity, coins){
	var storeItems = storeInfo.getItems();
	var cost;
	for (var storeItem in storeItems){
		if (storeItem.name == item)
			cost = storeItem.price;
	}
	if (coins >= quantity * cost)
		return quantity * cost;
	else 
		return false;
}