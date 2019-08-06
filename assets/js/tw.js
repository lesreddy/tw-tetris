


/**
 * Changes the Title 'Totally Wild Tetris' to a rainbow colour style
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
 * sets the player username for the game - uses bootbox
 */
document.getElementById("playername").addEventListener("click", playerName);
function playerName(e){
	var z = bootbox.prompt("PLEASE ENTER YOUR NAME", function display(z) {
	  if (z != null) {
		  document.getElementById("name").innerHTML = z;
		  localStorage.playername = z;
		  
		  dis(z);
	  }
	  else
		  document.getElementById("name").innerHTML = "";
	});
	}
	function dis(arg) {
	  bootbox.alert("Player name set to " + arg);
	}
	if(localStorage.playername === undefined) {
	  document.getElementById("name").innerHTML = "Player 1";
	} else {
	  document.getElementById("name").innerHTML = localStorage.playername;
	}
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
 * creates each playing piec 
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
	// below method 
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
 * below function switches the pieces position by rotating the matrix} matrix 
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
 * This function updates the score and changes the background image when the score increments by 500 points
 */
function updateScore() {
	document.getElementById('score').innerText = player.score;
	const bround = document.getElementById('mainDiv');
	const level = document.getElementById("stage");
	if (player.score >=0 && player.score <= 499) {
		level.innerText = "1";
	} else if (player.score >= 500 && player.score <= 999) {
		bround.style.backgroundImage = "url('../assets/images/frog.jpg')";
		level.innerText = "2";
	} else if (player.score >= 1000 && player.score <= 1499) {
		bround.style.backgroundImage = "url('../assets/images/macaw.jpg')";
		level.innerText = "3";
	} else if (player.score >= 2000 && player.score <= 2499) {
		bround.style.backgroundImage = "url('../assets/images/snake.jpg')";
		level.innerText = "4";
	} else if (player.score >= 2500 && player.score <= 2999) {
		bround.style.backgroundImage = "url('../assets/images/gorilla.jpg')";
		level.innerText = "5";
	} else if (player.score >= 3000 && player.score <= 3499) {
		bround.style.backgroundImage = "url('../assets/images/crocodile.jpg')";
		level.innerText = "6";
	} else if (player.score >= 3500 && player.score <= 3999) {
		bround.style.backgroundImage = "url('../assets/images/shark.jpg')";
		level.innerText = "7";
	} else if (player.score >= 4000 && player.score <= 4499) {
		bround.style.backgroundImage = "url('../assets/images/tiger.jpg')";
		level.innerText = '8';
	} else if (player.score >= 4500 && player.score <= 4999) {
		bround.style.backgroundImage = "url('../assets/images/elephant.jpg')";
		level.innerText = '9';
	} else if (player.score >= 5000) {
		bround.style.backgroundImage = "url('../assets/images/lion.jpg')";
		level.innerText = '10';
	} 
}

const colors = [
	null,
	'#FF0D72',
	'#0DC2FF',
	'#0DFF72',
	'#F538FF',
	'#FF8E0D',
	'#FFE138',
	'#3877FF'
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




