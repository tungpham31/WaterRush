define(['modules/login'], function (login) {

	function auth (data, done) {
		var message = {
			token: login.getToken(),
			data: data,
		};

		$.ajax({
			url: '/data',
			type: 'POST',
			data: JSON.stringify(message),
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			success: function(data) {
				done(data);
			}
		});
	}
	
	return {
		send: function (requests, done) {
			auth(requests, done);
		},
	};

});
