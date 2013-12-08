var drs = require('../drs.js');

exports.endpoints = {
	'getNotifications': function (req, user, done) {
		/**
		 * - req is an object passed from the client.
		 * - user is what's provided by the authentication layer.
		 * - done is a callback function
		 * 
		 * This function should call done([response]) with an object which will be sent to the client.
		 * If this routine can fail, the returned object should indicate the reason for failure.
		 */
		 done(drs.getNotifications(user.id));
	},
};

var dtm = require('../dtm.js');

exports.addNotification = function (userId, notification, done) {
	/**
	 * This is an internal function. Other components on the server can call it, but it's
	 * not directly visible to the client.
	 */
	dtm.start().notification(userId, notification).commit(done);
};
