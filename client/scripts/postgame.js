define( [ 'modules/communication', '$' ], function ( comm ) {
	$( function () {
		var location = window.location,
			previous = document.referrer,
			params = location.search,
			score = JSON.parse( params.substring( params.indexOf( '=' ) + 1, params.indexOf( '&' ) ) ),
			success = JSON.parse( params.substring( params.lastIndexOf( '=' ) + 1 ) ),
			playNext = $( '#playNext' ),
			replayLevel = $( '#replayLevel' ),
			home = $( '#home' ),
			powerUP = $( '#powerUp' );


		if ( success ) {
			var win = $( '#win' );
			win.show();
			win.children( 'h3' ).text( score );
		} else {
			var loss = $( '#loss' );
			loss.show();
			loss.children( 'h3' ).text( score );
		}

		playNext.on( 'click', function () {
			var level = previous.substr( previous.lastIndexOf( '.' ) - 1, 1 );
			window.location = previous.substr( 0 , previous.lastIndexOf( '.' ) - 1 ) + ++level + '.html';
		} );

		replayLevel.on( 'click', function () {
			window.location = previous;
		} );

		home.on( 'click', function () {
			window.open('home.html', '_self', false);
		} );

		powerUP.on( 'click', function () {
			window.open('store.html', '_self', false);
		} );
	} );

	return {};
} );