//  File: app.js
//
//  Uses utility.js for utility functions and game constants 


// Enemies our player must avoid
var Enemy = function(ax, ay, aSpeed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = ax;
    this.y = ay;
    this.speed = aSpeed;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (frogger.isGamePaused()) return;
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > frogger.getGameConstant("CANVAS_WIDTH")) {
        this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // DEBUG - uncomment to view Enemy collision detection rect 
    /*  
    var enemyRect = this.getCollisionRect();

    ctx.save();
    ctx.beginPath();
    ctx.rect(enemyRect.topX, enemyRect.topY, enemyRect.width, enemyRect.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
    */
};

Enemy.prototype.getCollisionRect = function () {
    return new Rectangle(this.x + frogger.getGameConstant("ENEMY_X_RECT_OFFSET"), 
        this.y + frogger.getGameConstant("ENEMY_Y_RECT_OFFSET"),
        frogger.getGameConstant("ENEMY_ACTUAL_IMAGE_WIDTH"),
        frogger.getGameConstant("ENEMY_ACTUAL_IMAGE_HEIGHT"));
};

Enemy.prototype.toString = function() {
    var message;
    message = "x: " + this.x + " y: " + this.y + " speed: " + this.speed;
    console.log("Enemy details: " + message);
    return message;
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-pink-girl.png';
    this.x = frogger.getGameConstant("CANVAS_WIDTH") / 2 - frogger.getGameConstant("PLAYER_WIDTH") / 2;
    this.y = frogger.getGameConstant("PLAYER_INITIAL_Y");
    this.lives = frogger.getGameConstant("PLAYER_INITIAL_LIVES"); 

 
};

Player.prototype.moveToStart = function() {
    this.x =  frogger.getGameConstant("CANVAS_WIDTH") / 2 - frogger.getGameConstant("PLAYER_WIDTH") / 2;
    this.y = frogger.getGameConstant("PLAYER_INITIAL_Y");   
};
Player.prototype.won = function() {
    return this.y === frogger.getGameConstant("PLAYER_WON_Y_LOCATION");
};

Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Developer note: This function was not required for this game  
    //  since the player moves only in response to input and
    // only moves to the middle of each grid position
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    // Draw COLLISION bounding rectangle for the player
    /*
    var playerRect = this.getCollisionRect();
    ctx.save();
    ctx.beginPath();
    ctx.rect(playerRect.topX, playerRect.topY, playerRect.width, playerRect.height);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.restore();
    */
    // END DEBUG
};

Player.prototype.getCollisionRect = function() {
        return new Rectangle(this.x + frogger.getGameConstant("PLAYER_X_RECT_OFFSET"), 
            this.y + frogger.getGameConstant("PLAYER_Y_RECT_OFFSET"),
            frogger.getGameConstant("PLAYER_ACTUAL_IMAGE_WIDTH"),
           frogger.getGameConstant("PLAYER_ACTUAL_IMAGE_HEIGHT"));
};

Player.prototype.collidedWithObject = function(theEnemy) {
    // Better check this bug did not get in our way!
    var playerCollisionRect = this.getCollisionRect();
    var enemyCollisionRect = theEnemy.getCollisionRect();
    return playerCollisionRect.doRectsCollide(enemyCollisionRect);
};

Player.prototype.handleInput = function(strKey) {
    var oldX = this.x;
    var oldY = this.y;
    if (strKey === 'left') {
        this.x = this.x - frogger.getGameConstant("PLAYER_WIDTH");
    }
    if (strKey === 'right') {
        this.x = this.x + frogger.getGameConstant("PLAYER_WIDTH");
    }
    if (strKey === 'up') {
        this.y = this.y - frogger.getGameConstant("PLAYER_MOVE_Y");
    }
    if (strKey === 'down') {
        this.y = this.y + frogger.getGameConstant("PLAYER_MOVE_Y");
    }
     
    // Don't let the player move off the screen
    if (this.x >= frogger.getGameConstant("CANVAS_WIDTH")) {
        this.x = oldX;
    }
    if (this.x < 0) {
        this.x = oldX;
    }
    
    if (this.y < -40) {
       this.y = oldY;
    }
    if (this.y >= frogger.getGameConstant("CANVAS_HEIGHT") - frogger.getGameConstant("PLAYER_HEIGHT")) {
        this.y = oldY;
    }
};

var frogger = new Frogger();


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];

// create row #1 enemies
for (var i=0; i < frogger.getGameConstant("NUM_ENEMIES"); i++) {
    // put some enemies 
    var anEnemy = new Enemy(0 + i * 100, frogger.getGameConstant("ROW1_Y"), 25 * frogger.getSpeedLevel());
    allEnemies.push(anEnemy);
}

// create row #2 enemies
for (var i=0; i < frogger.getGameConstant("NUM_ENEMIES"); i++) {
    // put some enemies 
    var anEnemy = new Enemy(0 + i * 170, frogger.getGameConstant("ROW2_Y"), 50 * frogger.getSpeedLevel());
    allEnemies.push(anEnemy);
}

// create row #3 enemies
for (var i=0; i < frogger.getGameConstant("NUM_ENEMIES"); i++) {
    // put some enemies 
    var anEnemy = new Enemy(0 + i * getRandomNumber(150, 180) , 
                                frogger.getGameConstant("ROW3_Y"), 
                                10 * frogger.getSpeedLevel());
    //anEnemy.toString();
    allEnemies.push(anEnemy);
}
// Place the player object in a variable called player
var player = new Player();



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

