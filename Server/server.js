/**
 * Node and external module dependencies
 */

var connect = require('connect');
var dispatch = require('dispatch');
var http = require('http');

/**
 * Internal module dependencies
 */

var authentication = require('./authentication.js');
var batching = require('./batching.js');

/**
 * Configuration
 */

var config = {
	file: {
		cache: 30,
		path: '../client',
	},
	server: {
		ip: '0.0.0.0',
		port: 9320,
	},
};

/**
 * Externally visible services
 */

var notifications = require('./services/notifications.js');
var storeinfo = require('./services/storeInfo.js');

var services = {
	notifications: notifications.endpoints,
	storeinfo: storeinfo.endpoints,
}

/**
 * Request handling
 */

var server = http.createServer(
	connect()
	.use(dispatch({
		'POST /data': connect()
			.use(connect.json())
			.use(authentication)
			.use(batching(services)),
	}))
	.use(connect.static(config.file.path, { maxAge: config.file.cache * 1000 }))
);

/**
 * Listening
 */

server.listen(config.server.port, config.server.ip);
console.log('Server listening on ' + config.server.ip + ':' + config.server.port + '...');
