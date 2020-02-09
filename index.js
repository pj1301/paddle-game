document.addEventListener('DOMContentLoaded', () => console.log('Page loaded successfully'));

const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

// Object Variables
const ballRadius = 10;
const paddleHeight = 20;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Canvas Variables
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

// movement event listeners
document.addEventListener('keydown', keyPressHandler, false)


// movement functions
function keyPressHandler(e) {
  console.log(e);
  if (e.key === "ArrowLeft" && paddleX > 0) {
    paddleX -= 8;
  }
  if (e.key === "ArrowRight" && paddleX < canvas.width - 75) {
    paddleX += 8;
  }
}

// Drawing functions
function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight)
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // sets the area to be cleared
  drawBall();
  drawPaddle();
  if (x + dx < ballRadius || x + dx > canvas.width - ballRadius) return dx = -dx;
  
  if (y + dy < ballRadius || y + dy > canvas.height - (ballRadius + paddleHeight) && x > paddleX && x < paddleX + paddleWidth) return dy = -dy;

  if (y + dy > canvas.height - ballRadius / 2) {
    alert("GAME OVER!!!");
    document.location.reload();
    clearInterval(game);
  }

  x += dx;
  y += dy;
}

// create draw loop
const game = setInterval(draw, 10);