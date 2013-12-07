define(['jquery', 'login'], function ($, login) {

	function auth (data, done) {
		var message = {
			token: login.getToken(),
			data: data,
		};
		$.post('/data', JSON.stringify(message))
			.done(function (data) {
				done(data);
			})
			.fail(function () {
				// TODO: Error handling
			});
	}
	
	return {
		send: function (requests, done) {
			auth(requests, done);
		},
	};

});
