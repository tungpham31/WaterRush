var async = require('async');
var drs = require('../drs.js');
var storeInfo = require('./storeInfo.js');

var fakePowerups = [
        {"name" : "freeze", "count" : 3},
        {"name" : "boom", "count" : 5},
        {"name" : "req", "count" : 15},
];

var fakeLives = 10;

exports.endpoints = {
    /**
     * Returns the number of coins the user has.
     */
    'getCoins': function (req, user, done) {
        drs.getCoins(user.id, function(err, result){
            done(result);
        });
    },
    /**
     * returns the number of coins the user has.
     */
    'getLives': function (req, user, done) {
        drs.getLives(user.id, function(err, result){
            done(result);
        });
    },



    'getFakeCoins': function (req, user, done) {
        done(133);
    },
    'getFakeLives': function (req, user, done) {
        done(fakeLives);
    },
    'getFakePowerups' : function (req, user, done) {
        done(fakePowerups);
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