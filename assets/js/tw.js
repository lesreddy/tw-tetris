const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20,20);



const matrix = [
    [0,0,0],
    [1,1,1],
    [0,1,0],
];

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

	drawMatrix(player.matrix, player.pos);
}

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

function merge(arena, player) {
	player.matrix.forEach((row,y) => {
		row.forEach((value,x) => {
			if (value !== 0) {
				arena[y + player.pos.y][x + player.pos.x] = value;
			}
		})
	})
}

// This function clears the canvas so that it can re-draw the shape
// The requestAnimationFrame method is used for the following reasons:
// 1. Browser can optimize it, so animations will be smoother
// 2. Animations in inactive tabs will stop, allowing the CPU to pause and reset
// 3. Battery-friendly

function playerDrop() {
	player.pos.y++;
	dropCounter = 0;
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

const arena = createMatrix(12, 20);
console.log(arena), console.table(arena);

const player = {
	pos: {x: 5, y: 5},
	matrix: matrix,
}

/* addEventLister method attaches an event handler to the specified element
without overriding existing event handlers so you can add many event
handlers to one element */

document.addEventListener('keydown', event => {
	if (event.keyCode === 37) {
		player.pos.x--;
	}  else if (event.keyCode === 39) {
		player.pos.x++;
	} else if (event.keyCode === 40) {
	playerDrop();
	}
});

update();