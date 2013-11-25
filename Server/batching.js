module.exports = function (services) {

	/**
	 * When the server starts, we can do some initialization logic for the batching module here
	 * and return the handler function (below) which will process individual HTTP requests.
	 */

	return function (req, res, next) {
		/**
		 * This function should parse requests and distribute them to the appropriate services.
		 * If authentication fails, finish the response in this function and don't call next().
		 */
		 res.end();
	};
};
