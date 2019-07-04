const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);



const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

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
	matrix: matrix,
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
	}
});

update();