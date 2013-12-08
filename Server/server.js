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

var services = {
	buyCoins: require('./services/buyCoins.js').endpoints,
	friendGraph: require('./services/friendGraph.js').endpoints,
	inventory: require('./services/inventory.js').endpoints,
	leaderBoard: require('./services/leaderBoard.js').endpoints,
	levelReport: require('./services/levelReport.js').endpoints,
	mapProgress: require('./services/mapProgress.js').endpoints,
	notifications: require('./services/notifications.js').endpoints,
	spendCoins: require('./services/spendCoins.js').endpoints,
	storeInfo: require('./services/storeInfo.js').endpoints,
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
