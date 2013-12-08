var drs = require('../drs.js');
var dtm = require('../dtm.js');

exports.endpoints = {
	'addLevelProgress': function (req, user, done) {
	/**
	 * [
		{"user" : "xxxxx", "coins" : "10", "levelId" : "5", "score" : "1000","freeze" : "10", 
		"boom" : "5", "reQ" : "10", "win" : "true"}
		];
	 */
	 var userId = user.id;
	 var levelId = req.levelId;
	 var score = req.score;

	 var success = req.win;

	 var lives;

	 	if(success == true){
	 		lives = 0;
	 	}
	 	else{
	 		lives = -1;
	 	}

	 var coins = req.coins + calculateCoinReward(score,levelId);

	 var freezeQ;

	 	if(levelId == 1){
	 		freezeQ = req.freeze + 1;
	 	}
	 	else{
	 		freezeQ = req.freeze;
	 	}

	 var boomQ;

		if(levelId == 2){
	 		boomQ = req.boom + 1;
	 	}
	 	else{
	 		boomQ = req.boom;
	 	}

	 var reQ;

	 	if(levelId == 3){
	 		reQ = req.reQ + 1;
	 	}
	 	else{
	 		reQ = req.reQ;
	 	}


	dtm.start().levelProgress(userId,levelId,score)
		       .item(userId,"freeze",freezeQ)
		       .item(userId,"boom",boomQ)
		       .item(userId,"reQ",reQ)
		       .lives(userId,lives)
		       .coins(userId,coins)
		       .commit(done);
};
};

exports.calculateCoinReward = function(score, levelId){
	var reward = 5;
	return reward;
};

