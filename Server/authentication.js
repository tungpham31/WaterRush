module.exports = function (req, res, next) {
	/**
	 * Call next() if we want to pass control on to the batching handler.
	 * The req object should be augmented with information about the authenticated user.
	 * If authentication fails, finish the response in this function and don't call next().
	 */
	req.body = req.body.data;

	req.user = { id: 0 };
	next();
};
