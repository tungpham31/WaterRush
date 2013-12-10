function FreezePowerUp(count) {
	var num = count;
	var freezing = false;

	this.freeze = function() {
		if (num > 0) {
			num--;
			this.display();
			freezing = true;
			setTimeout(unfreeze, 15 * 1000); //15 seconds
		}	
	};

	unfreeze = function() {
		$('#queue .pipe').each(function() {
			$(this).css({"opacity": 1});
		});
		freezing = false;
	};

	this.isFreezing = function() {
		return freezing;
	};

	this.display = function() {
		$('#nFreeze').text(num);
	};
	this.display();

	this.setCount = function(newNum){
		//ret = server
		num = newNum;
		this.display();
	};
};

function ReQPowerUp(count) {
	var num = count;

	this.reQ = function(IMAGES, freezePU) {
		if (num > 0) {
			num--;
			
			this.display();
			$('#queue .pipe').each(function() {
				$(this).remove();
			});
			for (var i = 0; i < 6; i++)
				makePipe(IMAGES, freezePU);
		}	
	};

	this.display = function() {
		$('#nReQ').text(num);
	};

	this.setCount = function(newNum){
		num = newNum;
		this.display();
	};

	this.display();
};

function BoomPowerUp(count) {
	var num = count;
	var boomState = false;

	this.boomClicked = function() {
		if (num > 0) {
			boomState = true;
			num--;
			this.display();
		}	
	};

	this.getNum = function() {
		return num;
	}

	this.boomUsed = function() {
		boomState = false;
	}

	this.isBoom = function() {
		return boomState;
	}

	this.display = function() {
		$('#nBoom').text(num);
	};

	this.setCount = function(newNum){
		num = newNum;
		this.display();
	};
	this.display();
};