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
	},
};

var dtm = require('../dtm.js');

exports.addNotification = function (notification) {
	/**
	 * This is an internal function. Other components on the server can call it, but it's
	 * not directly visible to the client.
	 */
	return dtm.start().notification(notification).commit();
};
