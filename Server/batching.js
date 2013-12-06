module.exports = function (services) {
	return function (req, res, next) {
		/**
		 * This function parses requests and distributes them to the appropriate services.
		 * Batching must always finish the response.
		 */

		var obj = req.body;

		if (!obj) {
			console.warn('batching: No request object given!');
			res.statusCode = 400;
			res.end('400 Client Error (Water Rush)');
			return;
		}

		responses = {};

		function checkResponses() {
			for (service in obj) {
				if (!services[service]) { continue; }
				for (endpoint in obj[service]) {
					if (!services[service][endpoint]) { continue; }
					if (!(service in responses) || !(endpoint in responses[service])) {
						return;
					}
				}
			}

			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(responses));
		}

		checkResponses();

		for (service in obj) {
			var reqs = obj[service];

			var funcs = services[service];
			if (!funcs) {
				console.warn('batching: Service not found: ' + service);
				continue;
			}

			for (endpoint in reqs) {

				var func = funcs[endpoint];
				if (!func) {
					console.warn('batching: Service endpoint not found: ' + service + '/' + endpoint);
				}

				var done = function(result) {

					if (!result) {
						console.warn('batching: No result returned from ' + service + '/' + endpoint);
						result = {};
					}

					if (!(service in responses)) {
						responses[service] = {};
					}

					responses[service][endpoint] = result;

					checkResponses();

				};

				func(reqs[endpoint], req.user, done);

			}
		}
	};
};
