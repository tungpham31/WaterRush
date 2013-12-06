/**
 * Node and external module dependencies
 */

var connect = require('connect');
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
	server: {
		ip: '0.0.0.0',
		port: 9320,
	},
};

/**
 * Externally visible services
 */

var notifications = require('./services/notifications.js');

var services = {
	notifications: notifications.endpoints,
}

/**
 * Request handling
 */

var server = http.createServer(
	connect()
	.use(authentication)
	.use(batching(services))
);

/**
 * Listening
 */

server.listen(config.server.port, config.server.ip);
console.log('Server listening on ' + config.server.ip + ':' + config.server.port + '...');
