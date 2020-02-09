document.addEventListener('DOMContentLoaded', () => console.log('Page loaded successfully'));

const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

// Object Variables
const ballRadius = 10;
const paddleHeight = 20;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;
const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

// Canvas Variables
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// movement event listeners
document.addEventListener('keydown', keyPressHandlerOn, false)
document.addEventListener('keyup', keyPressHandlerOff, false)


// create bricks
const bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickRowCount; j++) {
    bricks[i][j] = { x: 0, y: 0, status: true };
  }
}

// movement functions
let moveLeft = false;
let moveRight = false;

function keyPressHandlerOn(e) {
  if (e.key === "ArrowLeft") {
    moveLeft = true;
    moveRight = false;
    return;
  }
  if (e.key === "ArrowRight") {
    moveRight = true;
    moveLeft = false;
    return;
  }
}

function keyPressHandlerOff() {
  moveLeft = false;
  moveRight = false;
}

// detect collisions
function detectCollisions() {
  for (let i = 0; i < brickColumnCount; i++) {
    for (let j = 0; j < brickRowCount; j++) {
      const b = bricks[i][j];
      if (b.status) {
        if(x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = false;
        }
      }
    }
  }
}

// Drawing functions
function createCircle(x, y, r, start, stop, color) {
 ctx.beginPath();
 ctx.arc(x, y, r, start, stop);
 ctx.fillStyle = color;
 ctx.fill();
 ctx.closePath();
}

function createSquare(x, y, w, h, color) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  createCircle(x, y, ballRadius, 0, Math.PI*2, "#0095DD")
}

function drawPaddle() {
  createSquare(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, "red");
}

function drawBricks() { // fine
  for (let i = 0; i < brickColumnCount; i++) {
    for (let j = 0; j < brickRowCount; j++) {
      if (bricks[i][j].status) {
        let brickX = (i * (brickWidth + brickPadding))+brickOffsetLeft;
        let brickY = (j * (brickHeight + brickPadding))+brickOffsetTop;
        bricks[i][j].x = brickX;
        bricks[i][j].y = brickY;
        createSquare(brickX, brickY, brickWidth, brickHeight, "black")
      }
    }
  }
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // sets the area to be cleared
  drawBricks();
  drawBall();
  drawPaddle();
  detectCollisions();

  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) {
    dx = -dx;
  }
  
  // sets the y boundaries (including the paddle if present)
  if (y + dy < ballRadius || y + dy > canvas.height - (ballRadius + paddleHeight) && x > paddleX && x < paddleX + paddleWidth) {
    dy = -dy;
  }

  // ends the game if the ball hits y = 0
  if (y + dy > canvas.height - ballRadius / 2) {
    alert("GAME OVER!!!");
    document.location.reload();
    clearInterval(game);
  }

  if (moveRight && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } 

  if (moveLeft && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
}

// create draw loop
const game = setInterval(draw, 10);