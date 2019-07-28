

const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);

/* arenaSweep function creates the line remove
component of the game, ie when a complete line is formed
with the random pieces it should be removed from the arena */

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



/* This function will allow the pieces to stay within
 the canvas when moving pieces come down or are moved side to side */

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

function createMatrix(w, h) {
	const matrix = [];
	while (h--) {
		matrix.push(new Array(w).fill(0));
	}
	return matrix;
}

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

function draw() {
	context.fillStyle = 'rgba(0,0,0, 1)';
	context.fillRect(0,0, canvas.width, canvas.height);

//below methoed draws the shape on the arena

	drawMatrix(arena, {x: 0, y: 0});
	drawMatrix(player.matrix, player.pos);
}

// Below function clears the canvas so that it can re-draw the shape

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

//The below function will copy all the values from the player into the arena

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

//Below function ensures the pieces collides with the edge of arena and other pieces

function playerMove(dir) {
	player.pos.x += dir;
	if (collide(arena, player)) {
		player.pos.x -= dir;
	}
}

// Below function ensures that pieces are randomly selected.

function gamePause() {

}

function playerReset() {
	const pieces ='ILJOTSZ';
	player.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
	player.pos.y = 0;
	player.pos.x = (arena[0].length / 2 | 0) -
				   (player.matrix[0].length / 2 | 0);
	// below method will ensure the game resets when pieces reach the top
	 if (collide(arena, player)) {
		arena.forEach(row => row.fill(0));
		player.score = 0;
		updateScore();
		Swal.fire({
			title: 'GAME OVER',
			text: "WOULD YOU LIKE TO START A NEW GAME?",
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, New Game!'
		  }).then((result) => {
			if (result.value) {
			  location.reload();
			  
			}
		  });
		}
}

/*below function implements the player rotate function so a piece can rotates
but importantly makes it stay in the playing arena*/

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


//below function switches the pieces position by rotating the matrix

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
/* The requestAnimationFrame method is used for the following reasons:
 1. Browser can optimize it, so animations will be smoother
 2. Animations in inactive tabs will stop, allowing the CPU to pause and reset
 3. Battery-friendly */	
	draw();
	requestAnimationFrame(update);

}

// below function creates a score for the game

function updateScore() {
	document.getElementById('score').innerText = player.score;
	
}

function butterBack() {
	el = document.getElementById("mainDiv");
            el.classList.remove("macaw", "frog", "snake", "croc", "elephant", "gorilla", "lion", "shark", "tiger");
            el.classList.add("butterfly");
}

function macawBack() {
	el = document.getElementById("mainDiv");
	el.classList.remove("butterfly", "frog", "snake", "croc", "elephant", "gorilla", "lion", "shark", "tiger");
	el.classList.add("macaw");
	}

function frogBack() {
	el = document.getElementById("mainDiv");
	el.classList.remove("macaw","butterfly", "snake", "croc", "elephant", "gorilla", "lion", "shark", "tiger");
	el.classList.add("frog");
}

function snakeBack() {
		el = document.getElementById("mainDiv");
		el.classList.remove("macaw", "frog", "butterfly", "croc", "elephant", "gorilla", "lion", "shark", "tiger");
		el.classList.add("snake");
}

function sharkBack() {
		el = document.getElementById("mainDiv");
		el.classList.remove("macaw", "frog", "snake", "croc", "elephant", "gorilla", "lion", "butterfly", "tiger");
		el.classList.add("shark");
}

function gorillaBack() {
		el = document.getElementById("mainDiv");
		el.classList.remove("macaw", "frog", "snake", "croc", "elephant", "butterfly", "lion", "shark", "tiger");
		el.classList.add("gorilla");
}

function crocBack() {
		el = document.getElementById("mainDiv");
		el.classList.remove("macaw", "frog", "snake", "butterfly", "elephant", "gorilla", "lion", "shark", "tiger");
		el.classList.add("croc");
}

function tigerBack() {
	el = document.getElementById("mainDiv");
	el.classList.remove("macaw", "frog", "snake", "crocodile", "elephant", "gorilla", "lion", "shark", "butterfly");
	el.classList.add("tiger");
}

function elephantBack() {
	el = document.getElementById("mainDiv");
	el.classList.remove("macaw", "frog", "snake", "crocodile", "butterfly", "gorilla", "lion", "shark", "tiger");
	el.classList.add("elephant");
}

function lionBack() {
	el = document.getElementById("mainDiv");
	el.classList.remove("macaw", "frog", "snake", "crocodile", "elephant", "gorilla", "butterfly", "shark", "tiger");
	el.classList.add("lion");
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

/* addEventLister method attaches an event handler to the specified element
without overriding existing event handlers so you can add many event
handlers to one element */

document.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		playerMove(-1);
	}  else if (event.keyCode === 39) {
		playerMove(1);
	} else if (event.keyCode === 40) {
	playerDrop();
	} else if (event.keyCode === 38) {
		playerRotate(-1);
	} else if (event.keyCode === 87) {
		playerRotate(1);
	}
});

playerReset();
updateScore();
update();




