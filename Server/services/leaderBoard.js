var drs = require('../drs.js');
/* frindGraph.js not created yet, may not be implemented. deemed low priority */
/* Create a fake friends list here and use it if necessary, or have friendGraph fake it */
var friendGraph = require('friendGraph.js');

var getFriendHighScore = function (req, user, done) {
    /**
     * Returns a list of the user’s friends’ highest scores for a level.
     */
    var friends = friendGraph.getFriends(user); //assuming the structure of friend works here

    /* does this need to be async witout waiting for each?? 
       async may change the ordering of friends? use ordered array instead?*/
    /* This creates a list in the form of:
        ret = [{'James': 1239}, {'Mary': 2939}] */
    async.map (friends, drs.getPlayerScores, function(err, result){
        result.sort(compare);
        done(result);
    });

},

exports.endpoints = {
    'getGlobalHighScore': function (req, user, done) {
		/**
		 * Returns a list of the 50 highest scores for a level.
         * req: the levelId of a level
		 */
        var allHighScore = drs.getLevelScores(req);
        var top50 = 
        done(drs.getLevelScores(req));
    },
    'getFriendHighScore': getFriendHighScore,
    'getFiveClosestScores': function (req, user, done) {
        /**
         * Returns a list of 5 scores closest to the user’s score for a given level.
         */
        var friendScores = getFriendHighScore(req, user/*, done*/);
                                                        // do I want to pass done?
        var index;
        friendScores.some(function(entry, i) {
            if (getOnlyKey(entry) == user) {
                index = i;
                return true;
            }
        });
        /*
        sorta thing
        friendScores[index-2]
        friendScores[index-1]
        friendScores[index]
        friendScores[index+1]
        friendScores[index+2]
        */
    },
};

function compare(a,b) {
    if (getOnlyValue(a) < getOnlyValue(b))
        return -1;
    if (getOnlyValue(b) < getOnlyValue(a))
        return 1;
    return 0;
}

/**
 * Returns the value for an object's first value found. We're assuming that the passed
 * object has only one property.
 */
function getOnlyValue(obj) {
    for (var prop in obj){
        if (obj.hasOwnProperty(prop))
            return obj[prop];
    }
}

function getOnlyKey(obj) {
    for (var prop in obj){
        if (obj.hasOwnProperty(prop))
            return prop;
    }
}