const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);





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
			[1, 1],
			[1, 1],
		];
	} else if (type === 'L') {
		return [
			[0, 1, 0],
    		[0, 1, 0],
    		[0, 1, 1],
		];
	} else if (type === 'J') {
		return [
			[0, 1, 0],
    		[0, 1, 0],
    		[1, 1, 0],
		];
	} else if (type === 'I') {
		return [
			[0, 1, 0, 0],
    		[0, 1, 0, 0],
			[0, 1, 0, 0],
			[0, 1, 0, 0],
		];
	} else if (type === 'S') {
		return [
			[0, 1, 1],
    		[1, 1, 0],
    		[0, 0, 0],
		];
	} else if (type === 'Z') {
		return [
			[1, 1, 0],
    		[0, 1, 1],
    		[0, 0, 0],
		];
}

function draw() {
	context.fillStyle = '#000';
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
				context.fillStyle = 'red';
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
		player.pos.y = 0;

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

const arena = createMatrix(12, 20);


const player = {
	pos: {x: 5, y: 5},
	matrix: createPiece('T'),
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

update();