// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // this.x is as such to create delay in enemy showing on canvas
    this.x = Math.random() * -1000 - 101;
    // this.y is as such to create random showing on rows on canvas and
    // 21 pixel substracted to center enemy on image block
    this.y = -21 + Math.ceil(Math.random() * 3) * 83;
    // Speed is made random and has minimum of 100
    this.speed = Math.round(Math.random() * 400) + 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Enemy will be repositioned and after passing the most right of canvas
    if (this.x >= 505) {
        this.x = Math.random() * -1000 - 101;
        this.y = -21 + Math.ceil(Math.random() * 3) * 83;
        // Speed will be reassigned after passing the most right of canvas
        this.speed = Math.round(Math.random() * 400) + 100;
    } else {
        // Movement is dt times enemy speed
        this.x += dt * this.speed;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    // X and Y coordinates as such that player initially appears in bottom center
    this.x = 202;
    this.y = 382;
};

// Update method takes two arguments:
// axis to determine whether to move horizontally or vertically
// movement to determine how many pixels the movement is on canvas
Player.prototype.update = function(axis, movement) {
    // Conditions to determine horizontal or vertical movement and
    // so player could not move beyond canvas
    if (axis === 'x' && (this.x + movement >= 0 && this.x + movement < 505)) {
        this.x = this.x + movement;
    } else if (axis === 'y' && ((this.y + movement) <= 382 && (this.y + movement) >= 50)) {
        this.y = this.y + movement;
    // Condition below to reset player's position to initial after
    // crossing the water
    } else if (axis === 'y' && (this.y + movement) < 50) {
        this.x = 202;
        this.y = 382;
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// handleInput takes direction argument from addEventListener and
// use update method to reposition player object
Player.prototype.handleInput = function(direction) {
    if (direction == 'left') {
        this.update('x', -101);
    } else if (direction == 'up') {
        this.update('y', -83);
    } else if (direction == 'right') {
        this.update('x', 101);
    } else {
        this.update('y', 83);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// Instantiate 6 enemies
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var enemy6 = new Enemy();

// Create variable allEnemies for updateEntities function in engine.js
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Instantiate player object
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
    // Changing keyup to keydown to improve control experience
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// Create checkcCollisions global function
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        // Condition checks whether player's most left of right pixel is
        // between enemy's most left and right pixel and
        // it checks the vertical position, on which if player and enemy
        // object are at the same row they would differ 12px vertically
        if (((player.x + 17 > enemy.x && player.x + 17 < enemy.x + 100) || (player.x + 84 > enemy.x && player.x + 84 < enemy.x + 100)) && player.y === enemy.y - 12) {
            player.x = 202;
            player.y = 382;
        }
    });
}
