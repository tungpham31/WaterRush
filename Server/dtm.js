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
		lives: function(userId, lives) {
			/* add quatity lives to userId's lives cound */
			transaction.push({"type": "lives", "transaction": { "userid": userId, "lives": lives } });
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
					// FIXME: add upsert: true
					case "coin":
						db.userInventory.update({ "userid": trans["transaction"]["userid"]}, 
												{$inc: {"coins": trans["transaction"]["quantity"]}},
												{upsert: true}
						);
						break;
					case "lives":
						db.userInventory.update({ "userid": trans["transaction"]["userid"]}, 
												{$inc: {"lives": trans["transaction"]["quantity"]}},
												{upsert: true}
						);
						break;
					case "item":
						db.userInventory.update({"userid": trans["transaction"]["userid"], "items.itemid": trans["transaction"]["itemid"]},
												{$inc: {"items.$.quantity": trans["transaction"]["quantity"]} },
												{upsert: true}
						);
						break;
					case "level":
						//FIXME: 
						//if (db.scores.find({"userid": trans["transaction"]["userid"], "levelid": trans["transaction"]["levelid"] }) < trans["transaction"]["score"])
							db.scores.update(
								{"userid": trans["transaction"]["userid"]}, 
								{"scores.levelid": trans["transaction"]["levelid"], 
									$set : { "scores.$.score": trans["transaction"]["score"]}},
								{upsert: true}
							);
						break;
					case "notification":
						db.notification.update(
    						{"userid": trans["transaction"]["userid"]},
    						{$addToSet: {"notifications": {"notification": trans["transaction"]["notification"]}}},
    						{upsert: true}
    					);
						break;
					case "receipt":
						db.receipt.insert({"userid": trans["transaction"]["userid"],"notification": trans["transaction"]["notification"]});
						break;
				}
			});
		},
	};
};
