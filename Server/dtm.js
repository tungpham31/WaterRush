exports.start = function() {
	/* begins a transaction (returns an empty transaction object) */
	return {
		coins: function(userId, quantity) {
			/* add quantity coins to userId’s coin count */
			return this;
		},
		item: function(userId, itemId, quantity) {
			/* add quantity itemIds for userId */
			return this;
		},
		levelProgress: function(userId, levelId, score) {
			/* update userId’s high score on levelId with score */
			return this;
		},
		notification: function(userId, notification) {
			/* add notification to userId’s queue */
			return this;
		},
		receipt: function(receipt) {
			/* will add the receipt, fails if the receipt already exists */	
			return this;
		},
		commit: function(done) {
			/* attempts to process transaction (calls back with true/false) */
		},
	};
};
