let score = document.getElementById('score');
let totalLives = document.getElementById('lives');

class Enemy {
	constructor(x, y, speed) {
		this.sprite = 'images/enemy-bug.png';
		this.speed = speed;
		this.x = x;
		this.y = y;
		this.width = 101;
		this.height = 71;
	}

	update(dt) {
		if (this.x < 505) {
			this.x += this.speed * dt;
		} else {
			this.x = -101;
		}
	}

	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
	constructor() {
		this.sprite = 'images/char-boy.png';
		this.x = 202;
		this.y = 400;
		this.width = 101;
		this.height = 71;
		this.win = false;
		this.lives = 0;
		this.points = 0;
	}

	winCheck() {
		if (this.points === 9) {
			console.log('win');
		}
	}

	lossCheck() {
		if (this.lives === 0) {
			console.log('loss');
		}
	}

	lossUpdate(input){
		lives.innerText = `Lives: ${input}`;
	}

	update() {
		if (this.y === -15) {
			this.points++;
			this.x = 202;
			this.y = 400;
			score.innerText = `Score: ${this.points}`;
			this.winCheck();
		}
	}

	// Draw the player on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	handleInput(allowedKeys) {
		switch (allowedKeys) {
			case 'left':
				if (this.x > 0) {
					this.x -= 101;
				}
				break;
			case 'right':
				if (this.x < 404) {
					this.x += 101;
				}
				break;
			case 'up':
				if (this.y > 0) {
					this.y -= 83;
				}
				break;
			case 'down':
				if (this.y < 400) {
					this.y += 83;
				}
				break;
		}
	}

	reset() {
		this.points = 0;
		this.lives = this.lives + 5;
		score.innerText = `Score: ${this.points}`;
		totalLives.innerText = `Lives: ${this.lives}`;
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let player = new Player();

let allEnemies = [];

let enemy1 = new Enemy(-102, 66, 200);
let enemy2 = new Enemy(-102, 148, 300);
let enemy3 = new Enemy(-102, 230, 250);
allEnemies.push(enemy1, enemy2, enemy3);

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
