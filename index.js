document.addEventListener('DOMContentLoaded', () => console.log('Page loaded successfully'));

const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');

let x = canvas.width / 2;
let y = canvas.height - 30;
const dx = 2;
const dy = -2;

function draw() {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
  x += dx;
  y += dy;
}

setInterval(draw, 10);