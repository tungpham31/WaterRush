var drs = require('../drs.js');

exports.endpoints = {
	'getLevelReport': function (req, user, done) {
		/**
		 * - req is an object passed from the client.
		 * - user is what's provided by the authentication layer.
		 * - done is a callback function
		 * 
		 * This function should call done([response]) with an object which will be sent to the client.
		 * If this routine can fail, the returned object should indicate the reason for failure.
		 */
		 done();
	},
};

var dtm = require('../dtm.js');

exports.addLevelProgress = function (notification, done) {
	/**
	 * This is an internal function. Other components on the server can call it, but it's
	 * not directly visible to the client.
	 */
	dtm.start().addLevelProgress.commit(done);
};

exports.calculateCoinReward = function(score, levelId){
	var reward = 5;
	return reward;
};

exports.calculatePowerupReward = function(levelId){
	var powerupReward;
	if (level == 1){
		powerupReward = [1,0,0];
	}
	else if (level == 2){
		powerupReward = [0,1,0];
	}
	else if (level == 3){
		powerupReward = [0,0,1];
	}
	else{
	 	powerupReward = [1,1,1];
	}

	return powerupReward;
};