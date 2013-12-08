var drs = require('../drs.js');
var async = require('async');
/* frindGraph.js not created yet, may not be implemented. deemed low priority */
/* Create a fake friends list here and use it if necessary, or have friendGraph fake it */
var friendGraph = require('friendGraph.js');

/**
 * Returns a list of the user’s friends’ highest scores for a level.
 */
var getFriendHighScore = function (req, user, done) {

    var friends = friendGraph.getFriends(user.id); //assuming the structure of friend works here

    /* This creates a list in the form of:
        ret = [{'James': 1239}, {'Mary': 2939}] */
    async.map (friends, drs.getPlayerScores, function(err, result){
        result.sort(compare);
        console.dir(result);
        done(result);
    });

},

exports.endpoints = {
    /**
     * Returns a list of the 50 highest scores for a level.
     * req: the levelId of a level
     */
    'getGlobalHighScore': function (req, user, done) {
        var allHighScore = drs.getLevelScores(req);
        allHighScore.sort(compare);
        done(allHighScore.slice(0, 50);
    },

    /**
     * Returns a list of the user’s friends’ highest scores for a level.
     */
    'getFriendHighScore': getFriendHighScore,

    /**
     * Returns a list of 5 scores closest to the user’s score for a given level.
     * req : 
     */
    'getFiveClosestScores': function (req, user, done) {
        getFriendHighScore(req, user.id, function(err, friendScores){
            var index;
            
            // Find the index of <user> in the list of <friendScores>
            friendScores.some(function(entry, i) {
                if (getOnlyKey(entry) == user.id) {
                    index = i;
                    return true;
                }
            });

            /*
             * Find which 5 (or less) entries to return.
             */
            var listStart;

            /* Do not rearrange. Order of if statements are important.*/
            // [a, b, c, d, user]
            if (friendScores[index+1] == undefined)
                listStart = index-4;
            // [a, b, c, user, d]
            else if (friendScores[index+2] == undefined)
                listStart = index-3;
            // [user, a, b, c, d]
            else if (friendScores[index-1] == undefined)
                listStart = index;
            // [a, user, b, c, d]
            else if (friendScores[index-2] == undefined)
                listStart = index-1;
            // [a, b, user, c, d] Normal case
            else 
                listStart = index-2;

            // Assemble the list of 5 or less entries to return
            var ret = [];
            for (var i = listStart ; i < listStart+5 ; i++){
                // chuck any undefined entries i.e. there are less than 5 friends' scores
                if (friendScores[i] !== undefined)
                    ret = ret.concat(friendScores[i]);
            }
            done(ret);
        });
    },
};

// Max order
function compare(a,b) {
    if (getOnlyValue(a) < getOnlyValue(b))
        return 1;
    if (getOnlyValue(b) < getOnlyValue(a))
        return -1;
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

/**
 * Returns the value for an object's first key found. We're assuming that the passed
 * object has only one property.
 */
function getOnlyKey(obj) {
    for (var prop in obj){
        if (obj.hasOwnProperty(prop))
            return prop;
    }
}