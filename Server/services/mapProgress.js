var async = require('async');
var drs = require('../drs.js');

exports.endpoints = {
    'getLevelProgress': function (req, user, done) {
		/**
		 * - req is an object passed from the client.
		 * - user is what's provided by the authentication layer.
		 * - done is a callback function
		 * 
		 * Returns JSON object with the highest completed level, coins, and lives of
		 * the user. If this routine can fail, the returned object should indicate the
		 * reason for failure.
		 */

        drs.getScores(user, function(err, data){
            if (err){
                done(err);
            }
            else{
                highestLevel = function(){
                    /* find the highest level from the <data> */
                    var maxLevel = -1;
                    for (var level in data) {
                      if (data.hasOwnProperty(level)) {
                        if (maxLevel < level) {
                            maxLevel = level;
                        }
                      }
                    }
                    return maxLevel;
                };
                done(highestLevel()); 
            }
        });   
    },
};
