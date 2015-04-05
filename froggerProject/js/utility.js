

// Utility Functions...........................................................
function getRandomNumber(low, high) {
	return Math.floor((Math.random() * high) + low);
}


// Frogger Game Specifics......................................................
var Frogger = function() {

	this.GAME_CONSTANTS = {
		// Number of enemies in a row
		NUM_ENEMIES : 2,		// Want a harder game set to 3!

		// Enemy row location
		ROW1_Y : 60,
		ROW2_Y : 146,
		ROW3_Y : 226,

		// Player dimensions	
		PLAYER_WIDTH : 101,
		PLAYER_HEIGHT : 171,
		PLAYER_WON_Y_LOCATION : -40,
		PLAYER_INITIAL_Y: 5 * 83 - 40,
		PLAYER_INITIAL_LIVES: 3,
		// Dimensions required for collision detection
		PLAYER_X_RECT_OFFSET : 18,
		PLAYER_Y_RECT_OFFSET : 90,
		PLAYER_ACTUAL_IMAGE_WIDTH : 66,
		PLAYER_ACTUAL_IMAGE_HEIGHT : 44,


		// Distance player moves up or down in the field of play
		PLAYER_MOVE_Y : 83,	

		//Enemy dimensions (used for collision detection)
		ENEMY_X_RECT_OFFSET : 4,
		ENEMY_Y_RECT_OFFSET : 78,
		ENEMY_ACTUAL_IMAGE_HEIGHT : 64,
		ENEMY_ACTUAL_IMAGE_WIDTH : 94,

		CANVAS_WIDTH : 505,
		CANVAS_HEIGHT : 606
	};

	// Indicates user won or lost or their lives!
	this.gameOver = false;

	// Manages the game pauses
	this.paused = false;
	this.PAUSED_CHECK_INTERVAL = 200;

	this.restoredFromPause = false;

	this.speedLevel = 1.0;

	this.level = 1;
};

Frogger.prototype.getGameConstant = function(cName) {
	return this.GAME_CONSTANTS[cName];
};

Frogger.prototype.setRestoredFromPause = function(bVal) {
	this.restoredFromPause = bVal;
};

Frogger.prototype.getRestoredFromPause = function() {
	return this.restoredFromPause;
};

Frogger.prototype.togglePaused = function() {
		this.paused = !this.paused;
};


Frogger.prototype.setGameOver = function(bVal) {
	this.gameOver = bVal;
};

Frogger.prototype.isGameOver = function() {
	return this.gameOver;
};

Frogger.prototype.setPaused = function(bVal) {
	this.paused = bVal;
};

Frogger.prototype.isGamePaused = function() {
	return this.paused;
};

Frogger.prototype.getSpeedLevel = function() {
	return this.speedLevel;
};

Frogger.prototype.incrementSpeedLevel = function() {
	this.speedLevel = this.speedLevel + 0.1;
};

Frogger.prototype.getLevel = function() {
	return this.level;
};

Frogger.prototype.incrementLevel = function() {
	this.level = this.level + 1;
};

// Used by objects that are involved in collision detection
var Rectangle = function(x, y, w, h) {

	this.topX = x;
	this.topY = y;
	this.width = w;
	this.height = h;


};

Rectangle.prototype.toConsole = function() {
	console.log("topX: " + this.topX + " topY: " + this.topY);
	console.log("width: " + this.width + " height: " + this.height);
};

Rectangle.prototype.doRectsCollide = function(anotherRect) {
		if (this.topX < anotherRect.topX + anotherRect.width &&
			this.topX + this.width > anotherRect.topX &&
			this.topY < anotherRect.topY + anotherRect.height &&
			this.height + this.topY > anotherRect.topY) {
			return true;
		}
		return false;
};
// set up the game to pause if window loses focus
window.onblur = function() {
	if (!frogger.isGamePaused()) {
		frogger.togglePaused();
	}
};

// resume the game if window regains focus
window.onfocus = function() {
	frogger.setRestoredFromPause(true);
	if (frogger.isGamePaused()) {
		frogger.togglePaused();
	}
};