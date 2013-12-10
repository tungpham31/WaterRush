$(function() {
	// Init static resources for game-play.
	// Init images for tiles and water flow.
	IMAGES = initImages();
	// Init connections.
	CONNECTIONS = initConnections();

	//level dependent
	var baseScore = parseInt($('#parameters').attr('baseScore'));
	var scoreMultiplier = parseInt($('#parameters').attr('scoreMultiplier'));
	var totalSquares = parseInt($('#parameters').attr('totalSquares'));
	var flowSpeed = parseFloat($('#parameters').attr('flowSpeed'));
	var startPipeId = parseInt($('#parameters').attr('startPipeId'));

	var params = $('#parameters'),
			baseScore = parseInt(params.attr('baseScore') ),
			scoreMultiplier = parseInt(params.attr('scoreMultiplier') ),
			totalSquares = parseInt(params.attr('totalSquares') ),
			levelID = parseInt( params.attr( 'level' ) );

	//not level dependent
	var tilesPlaced = 0;
	var points = baseScore*scoreMultiplier;
	var freezePU = new FreezePowerUp(0);
	var reQPU = new ReQPowerUp(0);
	var boomPU = new BoomPowerUp(0);

	require([ 'modules/communication_nojquery'], function(communication) {	
		communication.send({
			'inventory': {
				'getFakePowerups': {}
			}
		}, function (result) {
/* {"inventory": {"getFakePowerups": [ 
									{"name":"freeze","count":3},
									{"name":"boom","count":5},
									{"name":"req","count":15}
									]
					}
	}*/
			var list = result.inventory.getFakePowerups;
			for (powerup in list) {
				if ( list[powerup].name == "freeze"){				
					freezePU.setCount(list[powerup].count);}
				else if ( list[powerup].name == "boom"){				
					boomPU.setCount(list[powerup].count);}
				else if ( list[powerup].name == "req"){				
					reQPU.setCount(list[powerup].count);}
			}
		});
	});//*/

	// Create the queue.
	makePipe(IMAGES, freezePU, startPipeId);
	for (var i = 1; i < 6; i++) {
		makePipe(IMAGES, freezePU);
	}

	displayScore(points);

	function calculateScore() {
		var riverLength = lengthOfRiverbed();
		var unusedTiles = tilesPlaced - riverLength;

		points = points - unusedTiles*500 + baseScore;

		points = points*(scoreMultiplier + ((20 < riverLength*100/totalSquares) ? 10 : 0));

		displayScore(points);
	}

	function lengthOfRiverbed() {

		var next = getRight( $('#board' ).find( '.row .start' ).first() );
		var length = 0;
		var direction = 'e';
		var currentPoints = 0;

		points = 0;

		while (next.is('.pipe')) {
			var id = next.attr('data-pipeType');
			if (direction in CONNECTIONS[id]) {

				var ns = ['n', 's'].indexOf(direction) > -1;
				var both = ((next.attr('data-flow-' + (ns ? 'e' : 'n')) == 1)
					|| (next.attr('data-flow-' + (ns ? 'w' : 's')) == 1));

				direction = CONNECTIONS[id][direction];
				if (direction == 'n') { next = getTop(next); }
				else if (direction == 'e') { next = getRight(next); }
				else if (direction == 's') { next = getBottom(next); }
				else if (direction == 'w') { next = getLeft(next); }
			} else {
				break;
			}
			length++;
			if(next.hasClass('star')){
				points += 1500;
			}
			else{
				points += 1000;
			}
		}

		return length;
	}

	function getRight (pipe) {
		return pipe.next('.pipe, .end, .start, .slot');
	};

	function getLeft (pipe) {
		return pipe.prev('.pipe, .end, .start, .slot');
	};

	function getTop (pipe) {
		return pipe.parent().prev().children().eq(pipe.index()).filter('.pipe, .end, .start, .slot');
	};

	function getBottom (pipe) {
		return pipe.parent().next().children().eq(pipe.index()).filter('.pipe, .end, .start, .slot');
	};

	function makeSlot () {
		var slot = $('<div class="slot"></div>');

		slot.droppable({
			drop: function( event, ui ) {
				var index = $(this).index();
				$('#board' ).find( '.row' ).each( function() { $(this).children().eq(index).removeClass('over'); } );
				$(this).siblings().each(function() { $(this).removeClass('over'); });

				var pipe = ui.draggable;
				if(this.classList.contains('star')){
					pipe.addClass('star');
				}

				pipe.click(function(){
				if(boomPU.isBoom()){
					boomPU.boomUsed();

					var newSlot = makeSlot();

					if(this.classList.contains('star')){
						newSlot.addClass('star');
					}

					$(this).replaceWith(newSlot);

					tilesPlaced--;
				}
			});

				$(this).replaceWith(pipe);
				pipe.draggable('destroy');
				pipe.css({ 'position': '', 'left': '', 'top': '' });

				pipe = makePipe(IMAGES, freezePU);
				pipe.hide().slideDown();

				tilesPlaced++;

				displayScore(points);
				start();
			},
			over: function( event, ui ) {
				var index = $(this).index();
				$('#board' ).find( '.row' ).each(function() { $(this).children().eq(index).addClass('over'); });
				$(this).siblings().each(function() { $(this).addClass('over'); });
			},
			out: function( event, ui ) {
				var index = $(this).index();
				$('#board' ).find( '.row' ).each(function() { $(this).children().eq(index).removeClass('over'); });
				$(this).siblings().each(function() { $(this).removeClass('over'); });
			}
		});

return slot;
};

$("#freeze").click(
	function() { 
		freezePU.freeze(); }
		);

$("#reQueue").click(
	function() { 
		reQPU.reQ(IMAGES, freezePU); 
	}
	);

$("#boom").click(
	function() { boomPU.boomClicked(); }
	);

$('#exitLevel').click(function(){
	defeat();
});

$('.slot').replaceWith(function(){
	if (this.classList.contains('star')) {
		return makeSlot().addClass('star');
	} else {
		return makeSlot();
	}
});

var fps = 30;

function update() {
	var next = getRight( $('#board' ).find( '.row .start' ).first() );
	var direction = 'e';

	calculateScore();
	checkWinState();

	while (next.is('.pipe')) {
		var id = next.attr('data-pipeType');
		if (direction in CONNECTIONS[id]) {
			var flow = parseFloat(next.attr('data-flow-' + direction) || 0);
			flow = Math.min(flow + (1.0 / fps)* flowSpeed, 1);

			if(!freezePU.isFreezing()) {
				next.attr('data-flow-' + direction, flow);
			}

			var ns = ['n', 's'].indexOf(direction) > -1;
			var both = ((next.attr('data-flow-' + (ns ? 'e' : 'n')) == 1)
				|| (next.attr('data-flow-' + (ns ? 'w' : 's')) == 1));

			next.css({ 'background-image': 'url("images/' + IMAGES[id]['flow'][direction + (both ? 'b' : '')][Math.min(3, Math.floor(flow * 4))] + '")' });
			if (flow < 1) { return; }

			direction = CONNECTIONS[id][direction];
			if (direction == 'n') { next = getTop(next); }
			else if (direction == 'e') { next = getRight(next); }
			else if (direction == 's') { next = getBottom(next); }
			else if (direction == 'w') { next = getLeft(next); }
		} else {
			defeat();
			return;
		}
	}

	if (next.is('.slot')) {
		next.addClass('spill');
		defeat();
	} else if (next.is('.end') && direction == 's') {
		next.addClass('done');
		victory();
	} else {
		defeat();
	}
};

function checkWinState() {
	var next = getRight( $('#board' ).find( '.row .start' ).first() );
	var direction = 'e';

	while (next.is('.pipe')) {
		var id = next.attr('data-pipeType');
		if (direction in CONNECTIONS[id]) {
			direction = CONNECTIONS[id][direction];
			if (direction == 'n') { next = getTop(next); }
			else if (direction == 'e') { next = getRight(next); }
			else if (direction == 's') { next = getBottom(next); }
			else if (direction == 'w') { next = getLeft(next); }
		} else {
			return;
		}
	}

	// Check if the flow ends at the end state.
	if (next.is('.end') && direction == 's') {
		flowSpeed = 4;
	};
}

function victory() {
	stop();
	alert('You win!. You have got ' + points + ' points');
	window.location.pathname = 'postgame.html?score=' + points + '&win=true';
}

function defeat() {
	stop();
	points = Math.max(0, points);
	window.location.pathname = 'postgame.html?score=' + points + '&win=false';
}

var updateId = -1;
function start() {
	if (updateId == -1) {
		updateId = setInterval(update, 1000 / fps);
	}
}

function displayScore (score) {
	$('#score').text("score: " + score);
}

function stop() {
	clearInterval(updateId);
}
});