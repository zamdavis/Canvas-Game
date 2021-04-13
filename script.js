let canvas; // Canvas element.
let ctx; // Canvas context.
let gameLoop; // Game loop time interval.

function drawGameCanvas() {

    // Get the canvas element.
    canvas = document.getElementById('gameBoard');
  
    // Make sure you got it.
    if (canvas.getContext) {
      // Specify 2d canvas type.
      ctx = canvas.getContext('2d');
    }
    // Play the game until the ball stops.
    gameLoop = setInterval(draw, 16);
    // Add keyboard listener.
    window.addEventListener('keydown', whatKey, true);
  }

  drawGameCanvas();

const boardX = 300; // Board width.
const boardY = 300; // Board height.
const paddleH = 10; // Paddle height.
const paddleD = boardY - paddleH; // Paddle depth.
const paddleW = 75; // Paddle width.

let paddleX = 150; // Initial paddle location.
let ballX = 150; // Ball x position.
let ballY = 150; // Ball y position.
let ballDX = 2; // Change in ball x position.
let ballDY = 4; // Change in ball y position.

function draw() {

    // Clear the board.
    ctx.clearRect(0, 0, boardX, boardY);
  
    // Fill the board.
    ctx.fillStyle = "thistle";
    ctx.beginPath();
    ctx.rect(0, 0, boardX, boardY);
    ctx.closePath();
    ctx.fill();
  
    // Draw a ball.
    ctx.fillStyle = "tomato";
    ctx.beginPath();
    ctx.arc(ballX, ballY, 15, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
  
    // Draw the paddle.
    ctx.fillStyle = "navy";
    ctx.beginPath();
    ctx.rect(paddleX, paddleD, paddleW, paddleH);
    ctx.closePath();
    ctx.fill();
  
    // Change the ball location.
    ballX += ballDX;
    ballY += ballDY;
  
    // Bounce on a left or right edge.
    if (ballX + ballDX > boardX - 15 || ballX + ballDX < 15)
      ballDX = -ballDX;
  
    // If ball hits the top, bounce it. 
    if (ballY + ballDY < 15) ballDY = -ballDY;
    // If the ball hits the bottom, check see if it hits a paddle.
    else if (ballY + ballDY > boardY - 15) {
      // If the ball hits the paddle, bounce it.
      if (ballX > paddleX && ballX < paddleX + paddleW) 
        ballDY = -ballDY;
      // Otherwise the game is over.
      else {
        clearInterval(gameLoop);
        alert("Game over!");
      }
    }
  }
  // Get key press.
function whatKey(evt) {

    switch (evt.keyCode) {
      // Left arrow.
    case 37:
      paddleX = paddleX - 20;
      if (paddleX < 0) paddleX = 0;
      break;
  
      // Right arrow.
    case 39:
      paddleX = paddleX + 20;
      if (paddleX > boardX - paddleW) paddleX = boardX - paddleW;
      break;
    }
  }
