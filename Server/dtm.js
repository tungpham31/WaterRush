exports.start = function() {
	/* begins a transaction (returns an empty transaction object) */
	return {
		coins: function(userId, quantity) {
			/* add quantity coins to userId’s coin count */
		},
		item: function(userId, itemId, quantity) {
			/* add quantity itemIds for userId */
		},
		levelProgress: function(userId, levelId, score) {
			/* update userId’s high score on levelId with score */
		},
		notification: function(userId, notification) {
			/* add notification to userId’s queue */
		},
		receipt: function(receipt) {
			/* will add the receipt, fails if the receipt already exists */	
		},
		commit: function() {
			/* attempts to process transaction (returns true/false) */
		},
	};
};
