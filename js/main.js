var game = {
	lvl: 0
};

var area = $('#game');
var startBtn = $('#start');
var score = $('#score')

$(function() {
    FastClick.attach(document.body);
});

function randomPosition(dot) {
	var w = 40
	var x = Math.floor(Math.random() * (area.width() - w));
	var y = Math.floor(Math.random() * (area.height() - w));
	return {
		left: x,
		top: y
	}
}

var timeout;

game.start = function() {
	game.lvl = 0;
	game.addDot();
	startBtn.detach();
	
	score.text('Score: ' + game.lvl)
}
game.fail = function() {
	area.append(startBtn);
}
game.nextLvl = function() {
	game.lvl += 1
	score.text('Score: ' + game.lvl)
}

game.dotClick = function() {
	clearTimeout(timeout);
	game.addDot();
	game.nextLvl();
}

game.addDot = function() {
	var dot = $('<div>').addClass('dot');
	dot.on('click', function() {
		dot.remove();
		game.dotClick();
	});
	dot.css(randomPosition(dot));
	area.append(dot);
	timeout = setTimeout(function() {
		dot.remove();
		game.fail();
	}, 2000);
}

startBtn.on('click', game.start);