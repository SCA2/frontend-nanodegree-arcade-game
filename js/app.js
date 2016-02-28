// Enemy and Player base class
var Character = function() {
  this.x = 0;
  this.y = 0;
  this.width = 82;
  this.height = 72;
  this.speed = 0;
  this.sprite = '';
};

// Update the character's position, required method for game
// Parameter: dt, a time delta between ticks
Character.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if(this.speed) {
    this.x += this.speed * dt;
    if(this.x > 505) this.x = -101;
  }
};

// Draw the character on the screen, required method for game
Character.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Character.prototype.collision = function(character) {
  if(Math.abs(character.x - this.x) > this.width) return false;
  if(Math.abs(character.y - this.y) > this.height) return false;
  character.collided();
  return true;
};

// Enemies our player must avoid
var Enemy = function() {
  Character.call(this);

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.speed = 0;

var Player = function() {
  Character.call(this);
  this.sprite = 'images/char-boy.png';
};
Player.prototype = Object.create(Character.prototype);

Player.prototype.handleInput = function(key) {
  switch(key) {
    case 'left'   : if(this.x > 100)  this.x -= 101; break;
    case 'right'  : if(this.x < 404)  this.x += 101; break;
    case 'up'     : if(this.y > 71)   this.y -= 83; break;
    case 'down'   : if(this.y < 322)  this.y += 83; break;
  }
};

Player.prototype.collided = function() {
  this.x = 202;
  this.y = 404;
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies[0] = new Enemy(); allEnemies[0].speed = 5; allEnemies[0].y = 62;
allEnemies[1] = new Enemy(); allEnemies[1].speed = 15; allEnemies[1].y = 145;
allEnemies[2] = new Enemy(); allEnemies[2].speed = 10; allEnemies[2].y = 228;

var player = new Player();
player.x = 202;
player.y = 404;

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
