
/**
 * Changes the Title 'Totally Wild Tetris' main logo to a rainbow colour style
 */
(function () {
  var angle = 0;
  var p = document.querySelector('p');
  var text = p.textContent.split('');
  var len = text.length;
  var phaseJump = 360 / len;
  var spans;

  p.innerHTML = text.map(function (char) {
    return '<span>' + char + '</span>';
  }).join('');

  spans = p.children;

  (function wheee () {
    for (var i = 0; i < len; i++) {
      spans[i].style.color = 'hsl(' + (angle + Math.floor(i * phaseJump)) + ', 55%, 70%)';
    }
    angle++;
    requestAnimationFrame(wheee);
  })();
})();



/**
 * Resets the game
 */ 
document.getElementById("gamerestart").addEventListener("click", resetGame);
 function resetGame(e){
	location.reload();
}


/**
 * Resets the game from the game over modal 
 */
document.getElementById("newGame").addEventListener("click", resetGame);
 function resetGame(e){
	location.reload();
}

let playerName = localStorage.getItem("playerName");

/**
 * 
 This function is designed to set the player name using local storage and activated when the set player name modal inititalises
 */
 function playerNameSubmitButton() {
	playerName = $('#playername').val();
	localStorage.setItem("playerName", playerName);
	$('#player').text(playerName);
}

$('#player-name-submit-button').click(function() {
    playerNameSubmitButton();
}); 

$('.playerNameLaunch').click(function() {
    $('#playerNameModal').modal('show');
}); 



/**
 * 
 * This function was implemented referencing my mentor (simen Daelin's: https://github.com/Eventyret/tetris-game/blob/master/assets/js/misc.js) z 
 * The reason for this was because I could not get my modal to work properly(#playerNameModal)
 */
/* function playerName(z){
	var z = bootbox.prompt("Let's set your playername", function display(z) {
	  if (z != null) {
		  document.getElementById("playername").innerHTML = z;
		  localStorage.playername = z;
		  
		  dis(z);
	  }
	  else
		  document.getElementById("playername").innerHTML = "New Player";
	});
	}
	function dis(arg) {
	  bootbox.alert("Player name set to " + arg);
	}
	if(localStorage.playername === undefined) {
	  document.getElementById("playername").innerHTML = "Player 1";
	} else {
	  document.getElementById("playername").innerHTML = localStorage.playername;
	}

	*/

/**
 * Sets up the Canvas
 */
var canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');
context.scale(20,20);

/**
* Creates the line remove
* component of the game, ie when a complete line is formed
* with the random pieces it should be removed from the arena
 */
function arenaSweep() {
	let rowCount = 1;
	outer: for (let y = arena.length -1; y > 0; --y) {
		for (let x = 0; x < arena[y].length; ++x) {
			if (arena[y][x] === 0) {
				continue outer;
			}
		}

		const row = arena.splice(y, 1)[0].fill(0);
		arena.unshift(row);
		++y;

		player.score += rowCount * 50;
		rowCount *= 2;
	}
}


/**
 * Allows the pieces to stay within
 * the canvas when moving pieces come down or are moved side to side */ 
function collide(arena, player) {
	const [m, o] = [player.matrix, player.pos];
	for (let y = 0; y < m.length; ++y) {
		for (let x = 0; x < m[y].length; ++x) {
			if (m[y][x] !== 0 &&
				(arena[y + o.y] && 
				arena[y + o.y][x + o.x]) !== 0) {
				return true;
			}		
		}
	}
	return false;
}
/**
 * Creates the matrix for the pieces to be placed on. 
 */
function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

/**
 * creates each playing piece
 */
function createPiece(type) {
	if (type === 'T') {
		return [
			[0, 0, 0],
    		[1, 1, 1],
    		[0, 1, 0],
		];
	} else if (type === 'O') {
		return [
			[2, 2],
			[2, 2],
		];
	} else if (type === 'L') {
		return [
			[0, 3, 0],
    		[0, 3, 0],
    		[0, 3, 3],
		];
	} else if (type === 'J') {
		return [
			[0, 4, 0],
    		[0, 4, 0],
    		[4, 4, 0],
		];
	} else if (type === 'I') {
		return [
			[0, 5, 0, 0],
    		[0, 5, 0, 0],
			[0, 5, 0, 0],
			[0, 5, 0, 0],
		];
	} else if (type === 'S') {
		return [
			[0, 6, 6],
    		[6, 6, 0],
    		[0, 0, 0],
		];
	} else if (type === 'Z') {
		return [
			[7, 7, 0],
    		[0, 7, 7],
    		[0, 0, 0],
		];
	}
}

/**
 *Draws the piece onto the playing arena
 */
function draw() {
	context.fillStyle = 'rgba(0,0,0, 1)';
	context.fillRect(0,0, canvas.width, canvas.height);

	drawMatrix(arena, {x: 0, y: 0});
	drawMatrix(player.matrix, player.pos);
}

/**
 * Clears the canvas so that it can re-draw the shape
 */
function drawMatrix(matrix, offset) {
	matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				context.fillStyle = colors[value];
				context.fillRect(x + offset.x,
					y + offset.y,
					1, 1);
			}
		})
	})
}

/**
 * Copies all the values from the player into the arena 
 */
function merge(arena, player) {
	player.matrix.forEach((row, y) => {
		row.forEach((value, x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		});
	});
}

function playerDrop() {
	player.pos.y++;
	if (collide(arena, player)) {
		player.pos.y--;
		merge(arena, player);
		playerReset();
		arenaSweep();
		updateScore();
	}
	dropCounter = 0;
}

/**
 * Ensures the pieces collide with the edge of arena and other pieces 
 *  */
function playerMove(dir) {
	player.pos.x += dir;
	if (collide(arena, player)) {
		player.pos.x -= dir;
	}
}

/**
 * Ensures that pieces are randomly selected and that the game resets when pieces reach the top.
 * Also calls the game over modal
 */

 function playerReset() {
	const pieces ='ILJOTSZ';
	player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
	player.pos.y = 0;
	player.pos.x = (arena[0].length / 2 | 0) -
				   (player.matrix[0].length / 2 | 0);
	 if (collide(arena, player)) {
		arena.forEach(row => row.fill(0));
		player.score = 0;
		updateScore();
		$('#finishGameModal').modal('show');
		}
}

/** 
 * Implements the player rotate function so a piece can rotates
but importantly makes it stay in the playing arena
*/
function playerRotate(dir) {
	const pos = player.pos.x;
	let offset = 1;
	rotate(player.matrix, dir);
	while (collide(arena, player)) {
		player.pos.x += offset;
		offset = -(offset + (offset > 0 ? 1 : -1));
		if (offset > player.matrix[0].length) {
			rotate(player.matrix, -dir);
			player.pos.x = pos;
			return;
		}
	}
}



/**
 * Switches the pieces position by rotating the  matrix 
 */
function rotate(matrix, dir) {
	for (let y = 0; y < matrix.length; ++y) {
		for (let x = 0; x < y; ++x) {
			[
				matrix[x][y],
				matrix[y][x],
			] = [
				matrix[y][x],
				matrix[x][y],
			];
		}
	}
	if (dir > 0) {
		matrix.forEach(row => row.reverse());
	} else {
		matrix.reverse();
	}
}

let dropCounter = 0;
let dropInterval = 1000;

let lastTime = 0;


function update(time = 0) {
	const deltaTime = time - lastTime;
	lastTime = time;

	dropCounter += deltaTime;
	if (dropCounter > dropInterval) {
		playerDrop();
}	
	draw();
	requestAnimationFrame(update);

}

/**
 * This function updates the score and changes the background image when the score increments by 500 points and also 
 * changes the end game modal fun fact description
 */
function updateScore() {
	document.getElementById('score').innerText = player.score;
	const bround = document.getElementById('mainDiv');
	const level = document.getElementById("stage");
	const change = document.getElementById("level");
	const funfact = document.getElementById("fun-fact");
	if (player.score >=0 && player.score <= 49) {
		level.innerText = "1";
		change.innerText = "1";
	} else if (player.score >= 50 && player.score <= 99) {
		bround.style.backgroundImage = "url('assets/images/frog.jpg')";
		level.innerText = "2";
		change.innerText = "2";
		funfact.innerText = "Frogs drink water by absorbing it through their skin and can jump over 20 times their own body length!";
	} else if (player.score >= 100 && player.score <= 149) {
		bround.style.backgroundImage = "url('assets/images/macaw.jpg')";
		level.innerText = "3";
		change.innerText = "3";
		funfact.innerText = "There are around 376 species of parrot throughout the world, and macaws are the biggest of all of them!";
	} else if (player.score >= 150 && player.score <= 199) {
		bround.style.backgroundImage = "url('assets/images/snake.jpg')";
		level.innerText = "4";
		change.innerText = "4";
		funfact.innerText = "There are over 3000 types of snakes in the world with the smallest being the Barbados threadsnake at average of 3.94 inches and the largest being the giant annaconda which can be as long as 30 feet!";
	} else if (player.score >= 200 && player.score <= 249) {
		bround.style.backgroundImage = "url('assets/images/gorilla.jpg')";
		level.innerText = "5";
		change.innerText = "5"
		funfact.innerText = "Gorillas have hands and feet like humans and some gorillas in captivity have learned to use sign language to communicate with humans!"
	} else if (player.score >= 250 && player.score <= 299) {
		bround.style.backgroundImage = "url('assets/images/crocodile.jpg')";
		level.innerText = "6";
		change.innerText = "6";
		funfact.innerText = "Crocodiles have the strongest bite of any animal in the world."
	} else if (player.score >= 300 && player.score <= 349) {
		bround.style.backgroundImage = "url('assets/images/shark.jpg')";
		level.innerText = "7";
		change.innerText = "7";
		funfact.innerText = "Adult great white sharks grow to a maximum size of approximately 20 feet in length, weigh up to 6,600 pounds, and are estimated to live for 30 years."
	} else if (player.score >= 350 && player.score <= 399) {
		bround.style.backgroundImage = "url('assets/images/tiger.jpg')";
		level.innerText = "8";
		change.innerText = "8";
		funfact.innerText ="The tiger is the biggest species of the cat family.";
	} else if (player.score >= 400 && player.score <= 449) {
		bround.style.backgroundImage = "url('assets/images/elephant.jpg')";
		level.innerText = "9";
		change.innerText = "9";
		funfact.innerText = "Male African elephants can reach 3m tall and weigh between 4,000 -7,500kg."
	} else if (player.score >= 450) {
		bround.style.backgroundImage = "url('assets/images/lion.jpg')";
		level.innerText = "10";
		change.innerText = "10";
		funfact.innerText = "Lions live for about 10-14 years in the wild. While in captivity they live for 20-25 years."
	} 
}

const colors = [
	null,
	'#2CF140',
	'#DD2828',
	'#BC1D90',
	'#1D79BC',
	'#E8FB16',
	'#F3B617',
	'#7ED3E5'
];

const arena = createMatrix(12, 20);


const player = {
	pos: {x: 0, y: 0},
	matrix: null,
	score: 0,
}


/**
 * Creates the controls for the game by assigning the keys
 * includes move left, move right, drop down, rotate left and right.
 */
document.addEventListener('keydown', event => {
	if (event.keyCode === 74) {
		playerMove(-1);
	}  else if (event.keyCode === 76) {
		playerMove(1);
	} else if (event.keyCode === 75) {
		playerDrop();
	} else if (event.keyCode === 87) {
		playerRotate(-1);
	} else if (event.keyCode === 81) {
		playerRotate(1);
	}
});

playerReset();
updateScore();
update();
