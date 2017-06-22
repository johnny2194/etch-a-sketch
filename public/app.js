var currentPosition = {x: 120, y: 100, xKnobRotation: 0, yKnobRotation: 0};

var app = function() {
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');
	ctx.moveTo(currentPosition.x, currentPosition.y);

	var rotateKnob = function(axis, movement) {
		var id = axis + "-knob";
		var knob = document.getElementById(id);
		var knobKey = axis + "KnobRotation"
		currentPosition[knobKey] += movement;
		knob.setAttribute('style', 'transform: rotate(' + currentPosition[axis + "KnobRotation"] + "deg);");
	}
	var drawLine = function(axis, movement) {
		var nextX, nextY;
		if (axis === 'x') {
			var nextX = currentPosition.x + movement;
			var nextY = currentPosition.y;
		} else {
			var nextX = currentPosition.x;
			var nextY = currentPosition.y + movement;
		}
		
		if (nextX > 0 && nextX < 500 && nextY > 0 && nextY < 400) {
			rotateKnob(axis, movement);
			ctx.beginPath();		
			ctx.moveTo(currentPosition.x, currentPosition.y);
			currentPosition.x = nextX;
			currentPosition.y = nextY;	
			ctx.lineTo(currentPosition.x, currentPosition.y);
			ctx.stroke();
		}
		
	}
	var handleMove = function(event) {
		event.preventDefault();
		var keyCode = event.which;
		if (keyCode === 38) drawLine('y', -2);
		if (keyCode === 40) drawLine('y', 2);
		if (keyCode === 37) drawLine('x', -2);
		if (keyCode === 39) drawLine('x', 2);
	}
	window.addEventListener('keydown', handleMove);
	var resetButton = document.getElementById("reset");
	ctx.fillStr
	var handleReset = function() {
		ctx.beginPath();
		ctx.clearRect(0, 0, 600, 500)
		currentPosition = {x: 300, y: 250, xKnobRotation: currentPosition.xKnobRotation, yKnobRotation: currentPosition.yKnobRotation};

	}
	resetButton.addEventListener('click', handleReset);
	window.focus();
}

window.addEventListener('load', app);