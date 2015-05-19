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
    // 21 pixel is substracted to center enemy on image block
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
    // Enemy will be repositioned after passing the most right of canvas
    this.x >= 505 ? (
        this.x = Math.random() * -1000 - 101,
        this.y = -21 + Math.ceil(Math.random() * 3) * 83,
        // Speed will be reassigned after passing the most right of canvas
        this.speed = Math.round(Math.random() * 400) + 100
    ) : (
        // Movement is dt times enemy speed
        this.x += dt * this.speed
    );
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = undefined; // To be later defined in character selection
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
    if (axis === 'x' && this.x + movement >= 0 && this.x + movement < 505) {
        this.x = this.x + movement;
    } else if (axis === 'y' && this.y + movement <= 382 && this.y + movement >= 50) {
        this.y = this.y + movement;
    // Condition below to reset player's position to initial after
    // crossing the water and add score
    } else if (axis === 'y' && this.y + movement < 50) {
        data.score += 10;
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

// Create data object that keeps track of score and lives and
// contains update and render methods to show itself on canvas
var data = {
    // Initial score and lives
    score: 0,
    lives:  3,
    // Update method reset score and lives when lives is 0
    update: function() {
        if (data.lives === 0) {
            data.score = 0;
            data.lives = 3;
        }
    },
    // Render method put score and lives on the canvas
    render: function() {
        ctx.font = "16px 'Helvetica Neue'";
        ctx.textBaseline = 'top';
        ctx.textAlign = 'left';
        ctx.fillText('Score: ' + this.score + ' Lives: ' + this.lives, 0.5, 0.5); // 0.5 is adjustment to make text less blurry
    }
};

// Gem class for player to collect to add score
var Gem = function(type) {
    // Differentiating gem based on how many points it adds to score
    if(type === 'normal') {
        this.sprite = 'images/Gem\ Blue.png';
        this.points = 10;
    } else if (type === 'medium') {
        this.sprite = 'images/Gem\ Green.png';
        this.points = 20;
    } else if (type === 'high') {
        this.sprite = 'images/Gem\ Orange.png';
        this.points = 30;
    }
    // To prevent gems showing initially
    this.x = undefined;
    this.y = undefined;
};

// Update method to determine gem location
Gem.prototype.update = function() {
    // Randomizing gem location which can be
    // anywhere on the canvas except the water area
    this.x = Math.round(Math.random() * 4) * 101;
    this.y = Math.round(Math.random() * 4) * 83 + 53;
};

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Life class for player to collect to add lives
var Life = function() {
    this.sprite = 'images/Heart.png';
    // Prevent life object appears at inital
    this.x = undefined;
    this.y = undefined;
};

// Update method to determine life location
Life.prototype.update = function() {
    this.x = Math.round(Math.random() * 4) * 101;
    this.y = Math.round(Math.random() * 4) * 83 + 76;
};

Life.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create gameLayout variable to help addEventListener on determining
// what actions must be taken and on what depending on the current game layout
var gameLayout;

// Create selector object for use in character selection
var selector = {
    sprite: 'images/Selector.png',
    // Position in the center of canvas
    x: 202,
    y: 216,
    // Update method takes movement argument to move selector position horizontally
    update: function(movement) {
        this.x += movement;
    },
    render: function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    },
    // handleInput method takes in direction from event listener
    // and  prevent selector to move beyond canvas
    handleInput: function(direction) {
        if (direction === 'left' && this.x > 0) {
            this.update(-101);
        } else if (direction === 'right' && this.x < 404) {
            this.update(101);
        }
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

// Instantiate gem objects
var gemNormal = new Gem('normal');
var gemMedium = new Gem('medium');
var gemHigh = new Gem('high');
var allGems = [gemNormal, gemMedium, gemHigh];

// Instantiate life object
var life = new Life();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
    // Changing keyup to keydown to improve control experience
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    // Conditional to check gameLayout and determine what to be done and on what
    if (gameLayout === 'mainGame') {
        // Move player if gameLayout is mainGame
        player.handleInput(allowedKeys[e.keyCode]);
    } else {
        // Assign player.sprite if layout is selection and enter is pressed
        if (allowedKeys[e.keyCode] === 'enter') {
            if (selector.x === 0) {
                player.sprite = 'images/char-boy.png';
            } if (selector.x === 101) {
                player.sprite = 'images/char-cat-girl.png';
            } if (selector.x === 202) {
                player.sprite = 'images/char-horn-girl.png';
            } if (selector.x === 303) {
                player.sprite = 'images/char-pink-girl.png';
            } if (selector.x === 404) {
                player.sprite = 'images/char-princess-girl.png';
            }
        } else {
            // Move selector if layout is selection and arrow key is pressed
            selector.handleInput(allowedKeys[e.keyCode]);
        }
    }
});

// Create checkcCollisions global function
function checkCollisions() {
    // Check collision between player and enemy
    allEnemies.forEach(function(enemy) {
        // Condition checks whether player's most left of right pixel is
        // between enemy's most left and right pixel and
        // it checks the vertical position, on which if player and enemy
        // object are at the same row they would differ 12px vertically
        if ((player.x + 17 > enemy.x && player.x + 17 < enemy.x + 100 || player.x + 84 > enemy.x && player.x + 84 < enemy.x + 100) && player.y === enemy.y - 12) {
            data.lives -= 1;
            player.x = 202;
            player.y = 382;
        }
    });

    // Check collision between player and gem
    allGems.forEach(function(gem) {
        if (player.x === gem.x && player.y === gem.y - 3) {
            // Dissapear gem and add points to score
            gem.x = undefined;
            gem.y = undefined;
            data.score += gem.points;
            // Show gem after certain amount of random time and depends on gem's points
            setTimeout(function() {
                gem.update();
            }, Math.round(Math.random() * gem.points) * 1000 + 1000)
        }
    });

    // Check collision between player and life
    if (player.x === life.x && player.y === life.y - 26) {
        // Dissapear life and add lives by 1
        life.x = undefined;
        life.y = undefined;
        data.lives += 1;
        // Show life after certain amount of random time
        setTimeout(function() {
            life.update();
        }, Math.round(Math.random() * 50) * 1000)
    }
}

// Show collectibles (gems and life) after certain amount of random time
Resources.onReady(function() {
    // Show gem after certain amount of random time and depends on gem's points
    allGems.forEach(function(gem) {
        setTimeout(function() {
            gem.update();
        }, Math.round(Math.random() * gem.points / 10) * 10000 + 1000)
    });

    // Show life after certain amount random time
    setTimeout(function() {
        life.update();
    }, Math.round(Math.random() * 10) * 10000);
});
