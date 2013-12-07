exports.start = function() {
	/* begins a transaction (returns an empty transaction object) */
	
	// "username:password@example.com/mydb"
	var databaseUrl = "alex@127.0.0.1/test";
	var collections = ["notifications","userInventory","scores"];
	var db = require("mongojs").connect(databaseUrl, collections);

	var userid = "";
	var transaction = [];
	
	return {
		coins: function(userId, quantity) {
			/* add quantity coins to userId’s coin count */
			transaction.push({"type": "coin", "transaction": { "userid": userId, "quantity": quantity}});
			return this;
		},
		item: function(userId, itemId, quantity) {
			/* add quantity itemIds for userId */
			transaction.push({"type": "item", "transaction": { "userid": userId, "itemid": itemId, "quantity": quantity }});
			return this;
		},
		levelProgress: function(userId, levelId, score) {
			/* update userId’s high score on levelId with score */
			transaction.push({"type": "level", "transaction": { "userid": userId, "levelid": levelId, "score": score}});
			return this;
		},
		notification: function(userId, notification) {
			/* add notification to userId’s queue */
			transaction.push({"type": "notification", "transaction": { "userid": userId, "notification": notification}});
			return this;
		},
		receipt: function(receipt) {
			/* will add the receipt, fails if the receipt already exists */	
			transaction.push({"type": "receipt", "transaction": { "receipt": notification}});
			return this;
		},
		commit: function() {
			/* attempts to process transaction (returns true/false) */
			var currentCount;
			transaction.foreach( function(trans){
				switch(trans["type"]){
					case "coin":
						currentCount = drs.getCoins(trans["userid"]);
						newcount = currentCount + trans["transaction"]["quantity"];
						db.collection('userInventory').findAndModify({
							{}
						}
						break;
					case "item":
						break;
					case "level":
						break;
					case "notification":
						break;
					case "receipt": 
						break;
				}
			});
		},
	};
};
