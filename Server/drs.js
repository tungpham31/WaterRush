var db = require('mongojs').connect(databaseUrl, collections);

exports.getCoins = function(userId) {
	/* returns userId’s coin count */
	
	//get the document matching the userId (assumes unique userids)
	var object = db.userInventory.find({userid: userId});

	return object.coins;
};

exports.getItemCount = function(userId, itemId) {
	/* returns userId’s quantity for itemId */

	//might need to change to db.collections('userInventory').find({userid: userId})
	var object = db.userInventory.find({userid: userId});

	return object.items[itemId].quantity;
};

exports.getScore = function(userId, levelId) {
	/* return userId’s high score for levelId */

	var object = db.scores.find({userid: userId});

	return db.scores.find({userid: userId, level: levelId}).levelScores[levelId].score;
};

exports.getScores = function(userId) {
	/* returns all of userId’s high scores */

	var object = db.scores.find({userid: userId});

	return object.scores;
};

exports.getNotifications = function(userId) {
	/* returns 25 most recent notifications for userId */

	var object = db.notifications.find({userid: userId});

	return object.notifications;
};
