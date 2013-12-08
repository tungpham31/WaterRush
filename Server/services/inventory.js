var drs = require('../drs.js');
var storeInfo = require('storeInfo.js');

exports.endpoints = {
    /**
     * - req is an object passed from the client.
     * - user is what's provided by the authentication layer.
     * - done is a callback function
     * 
     * Returns the number of coins the user has.
     */
    'getCoins': function (req, user, done) {
        drs.getCoins(user.id, function(err, result){
            done(result);
        };
    },
    /**
     * returns the number of coins the user has.
     */
    'getLives': function (req, user, done) {
        drs.getLives(user.id, function(err, result){
            done(result);
        });
    },
    /**
     * returns how many of which powerups the user has
     */
    'getPowerups': function (req, user, done) {
        var powerups = storeInfo.getItems();

        var items = [];
        for ( var powerup in powerups){
            items.push(powerup.name);
        }

        async.map (items, function(item, callback){ drs.getItemCount(user.id, item, callback)}, function(err, result){
            done(result);
        });

    },
};