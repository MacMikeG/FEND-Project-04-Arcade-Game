/*
HOW TO RANDOMIZE THE ENEMIES?
var a = ['a', 'b', 'c', 'd', 'e', 'f'];
var randomValue = a[Math.floor(a.length * Math.random())];
*/

/*ENEMIES*/
// Enemies our player must avoid
    class Enemy {
        constructor(x,y,speed,sprite) {
            this.x = x;
            this.y = y;
            this.speed = 100 + Math.floor(Math.random() * 500);
            this.sprite = 'images/char-boy.png';   // The image/sprite for our enemies, this uses a helper we've provided to easily load images
        };
    };

// Now instantiate your objects. Place all enemy objects in an array called allEnemies
    let enemy1 = new Enemy(-100, 300, 100);
    let enemy2 = new Enemy(-100, 200, 100);
    let enemy3 = new Enemy(-100, 100, 100);
    let allEnemies = [];
    allEnemies.push(enemy1, enemy2, enemy3);

// Update the enemy's position, required method for game. Parameter: dt, a time delta between ticks
    Enemy.prototype.update = function(dt) { 
        this.x += this.speed * dt;              // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
        // when off canvas, reset position of enemy to move across again
        if (this.x > 600) {
            this.x = -50;            
            this.speed = 100 + Math.floor(Math.random() * 500);
        }
        //Collision with player check
        if (player.x < this.x + 70 && player.x + 37 > this.x &&
            player.y < this.y + 25 && player.y + 30 > this.y) {
                player.x = 200;
                player.y = 380;
        }
    };

// Draw the enemy on the screen, required method for game
    Enemy.prototype.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };    

/*PLAYER*/
// Now write your own player class. This class requires an update(), render() and a handleInput() method.
    let Player = function(x, y, speed) {
        this.x = x;
        this.y = y; 
        this.speed = speed;
        this.sprite = 'images/char-bug.png';
    }  

// Place the player object in a variable called player
    let player = new Player(200, 400);

    Player.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    Player.prototype.handleInput = function (dt) {
        switch (dt) {
            case "left": this.x -= 102; break;
            case "up": this.y -= 102; break;
            case "right": this.x += 102; break;
            case "down": this.y += 102; break;
        }
    };    

//  Check the collision between player and the border
    checkCollisions = function () {
        if (player.y > 400) {
            player.y = 400;
        }
        if (player.x > 400) {
            player.x = 400;
        }
        if (player.x < 0) {
            player.x = 0;
        }
        if (player.y < 0) {
            player.x = 200;
            player.y = 400;
            alert('You made it!');
        }
    }

/*CONTROLS*/
// This listens for key presses and sends the keys to your Player.handleInput() method. You don't need to modify this.
    document.addEventListener('keyup', function(e) {
        var allowedKeys = {
            37: 'left',
            38: 'up',
            39: 'right',
            40: 'down'
        };
        player.handleInput(allowedKeys[e.keyCode]);
    });
