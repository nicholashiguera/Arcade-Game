/**
 *
 *
 * @class Enemy class.
 */
class Enemy {
	/**
	 * Creates an instance of Enemy with the image, width and height.
	 * @param {*} x - is the x coordinate of the enemy.
	 * @param {*} y - is the y coordinate of the enemy.
	 * @param {*} speed - is the speed of the enemy.
	 * @memberof Enemy
	 */
	constructor(x, y, speed) {
		this.sprite = 'images/enemy-bug.png';
		this.speed = speed;
		this.x = x;
		this.y = y;
		this.width = 70;
		this.height = 60;
	}

	/**
	 *
	 * @param {*} dt - time delta information.
	 * @memberof Enemy
	 */
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

/**
 *
 *
 * @class Player.
 */
class Player {
	/**
	 * Creates an instance of Player with it's image, x and y coordinates as well as width
	 * and height. Instanciates 
	 * @memberof Player
	 */
	constructor() {
		this.sprite = 'images/char-boy.png';
		this.x = 202;
		this.y = 400;
		this.width = 90;
		this.height = 65;
		this.win = false;
		this.loss = false;
		this.lives = 5;
		this.points = 0;
	}

	/**
	 *
	 *
	 * @memberof Player
	 */
	winCheck() {
		if (this.points === 9) {
			this.win = true;
			this.winningModal();
			this.reset();
		}
	}

	/**
	 *
	 *
	 * @memberof Player
	 */
	winningModal() {
		let modal = document.getElementById('winGameModal');
		document.getElementById('winningModal').style.display = 'block';
		modal.innerHTML = `You finished the game with a score of ${this.points} and ${this.lives} lives.`;
	}

	/**
	 *
	 *
	 * @memberof Player
	 */
	lossCheck() {
		if (this.lives === 0) {
			this.loss = true;
			this.lossModal();
			this.reset();
		}
	}

	/**
	 *
	 *
	 * @memberof Player
	 */
	lossModal() {
		let modal = document.getElementById('loseGameModal');
		document.getElementById('loseModal').style.display = 'block';
		modal.innerHTML = `You finished the game with a score of ${this.points} and ${this.lives} lives.`;
	}

	/**
	 *
	 *
	 * @param {*} input
	 * @memberof Player
	 */
	lossUpdate(input) {
		lives.innerText = `Lives: ${input}`;
	}

	/**
	 *
	 *
	 * @memberof Player
	 */
	update() {
		if (this.y === -15) {
			this.points++;
			this.x = 202;
			this.y = 400;
			score.innerText = `Score: ${this.points}`;
			this.winCheck();
		}
	}

	//
	/**
	 * @description Draw the player on the screen, required method for game
	 *
	 * @memberof Player
	 */
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	/**
	 *
	 *
	 * @param {*} allowedKeys
	 * @memberof Player
	 */
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

	/**
	 *
	 *
	 * @memberof Player
	 */
	reset() {
		this.points = 0;
		this.lives = 5;
		this.win = false;
		this.loss = false;
		score.innerText = `Score: ${this.points}`;
		totalLives.innerText = `Lives: ${this.lives}`;
	}
}

// Setting up the HTML elements that contain our scores and lives
let score = document.getElementById('score');
let totalLives = document.getElementById('lives');

// Setting up the HTML elements that contain our winning and loosing modals
let winningModal = document.getElementById('winningModal');
let loseModal = document.getElementById('loseModal');

// Instantiating player and enemy array
let player = new Player();
let allEnemies = [];

// Instantiating enemies with coordinates and speeds.
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

/**
 *	This function checks if the game has been win or lost and then removes the keyboard 
 *	event listener.
 *  !!! Currently not working but not affecting the main functionality of the game!!!
 */
function check() {
	if (player.loss === true || player.win === true) {
		document.removeEventListener('keyup', function(e) {
			var allowedKeys = {
				37: 'left',
				38: 'up',
				39: 'right',
				40: 'down'
			};

			player.handleInput(allowedKeys[e.keyCode]);
		});
	}
}

// This helper listens for clicks outside the modal and closes it.
window.onclick = function(event) {
	if (event.target == winningModal || event.target == loseModal) {
		winningModal.style.display = 'none';
		loseModal.style.display = 'none';
	}
};
