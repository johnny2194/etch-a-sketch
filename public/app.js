
var app = function() {
	var canvas = document.getElementById('main-canvas');
	var ctx = canvas.getContext('2d');

	var currentPosition = {x: 120, y: 100, xKnobRotation: 0, yKnobRotation: 0};
	ctx.moveTo(currentPosition.x, currentPosition.y);

	var rotateKnob = function(axis, movement) {
		var knob = document.getElementById(axis + '-knob');
		var knobKey = axis + 'KnobRotation';
		currentPosition[knobKey] += movement;
		var styleString = 'transform: rotate(' + currentPosition[knobKey] + 'deg);';
		knob.setAttribute('style', styleString);
	}

	var calculateNext = function(axis, movement) {
		var next = {};
		if (axis === 'x') {
			next.x = currentPosition.x + movement;
			next.y = currentPosition.y;
		} else {
			next.x = currentPosition.x;
			next.y = currentPosition.y + movement;
		}
		return next;
	}

	var drawLine = function(axis, movement) {
		var next = calculateNext(axis, movement);
		if (next.x > 0 && next.x < 500 && next.y > 0 && next.y < 400) {
			rotateKnob(axis, movement);
			ctx.beginPath();		
			ctx.moveTo(currentPosition.x, currentPosition.y);
			currentPosition.x = next.x;
			currentPosition.y = next.y;	
			ctx.lineTo(currentPosition.x, currentPosition.y);
			ctx.stroke();
		}	
	}

	var handleMove = function(event) {
		event.preventDefault();
		var keyCode = event.keyCode;
		if (keyCode === 38) drawLine('y', -2);
		if (keyCode === 40) drawLine('y', 2);
		if (keyCode === 37) drawLine('x', -2);
		if (keyCode === 39) drawLine('x', 2);
	}

	var handleReset = function() {
		ctx.beginPath();
		ctx.clearRect(0, 0, 600, 500)
		currentPosition = {
			x: 120,
			y: 100,
			xKnobRotation: currentPosition.xKnobRotation,
			yKnobRotation: currentPosition.yKnobRotation
		}
	}

	var resetButton = document.getElementById('reset');
	resetButton.addEventListener('click', handleReset);
	window.addEventListener('keydown', handleMove);
	window.focus();
}

window.addEventListener('load', app);