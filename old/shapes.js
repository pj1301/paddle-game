document.addEventListener('DOMContentLoaded', (e) => console.log('Loaded page...'));

const canvas = document.getElementById('game-board');
const ctx = canvas.getContext("2d");

// Below draws a path for a square object, which will start (left hand top corner of the shape) at x=20px and y=40px (values are from the top left hand corner of the canvas NOT the bottom left)
ctx.beginPath();
ctx.rect(20, 40, 50, 50); // (x, y, width, height)
ctx.fillStyle = "#FF0000"; // color white
ctx.fill();
ctx.closePath();

// below creates a circle object which starts (top left hand corner of the square that encompasses the shape from the top left hand corner of the canvas)
ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false); // (x, y, radius, startDrawAngleInRadians, endDrawAngleInRadians, drawDirection)
ctx.fillStyle = "black";
ctx.fill();
ctx.closePath();

ctx.beginPath();
ctx.arc(150, 200, 20, 0, Math.PI, false);
ctx.fillStyle = "blue";
ctx.fill();
ctx.closePath();

function draw() {
  
}