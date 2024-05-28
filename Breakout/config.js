const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

let ballRadius;
let x;
let y;
let dx;
let dy;
let paddleHeight;
let paddleWidth;
let paddleX;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 3;
const brickColumnCount = 5;
let brickWidth;
let brickHeight;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let bricks = [];
let gameOver = false;
let gameWon = false;

const paddleHitSound = new Audio('paddle_hit.wav');
const brickHitSound = new Audio('brick_hit.wav');
const wallHitSound = new Audio('wall_hit.wav');

// Set canvas size to fill the browser window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateGameElements();
    console.log('Canvas resized: ', canvas.width, canvas.height); // Debug log
}

function updateGameElements() {
    ballRadius = canvas.width * 0.02;
    x = canvas.width / 2;
    const paddleYOffset = canvas.height * 0.04; // Move paddle up by 4% of the screen height
    y = canvas.height - paddleYOffset - paddleHeight - ballRadius; // Start the ball above the paddle
    dx = canvas.width * 0.01;
    dy = -canvas.height * 0.015;
    paddleHeight = canvas.height * 0.02;
    paddleWidth = canvas.width * 0.40; // Set paddle width to 40% of canvas width
    paddleX = (canvas.width - paddleWidth) / 2;
    brickWidth = (canvas.width / brickColumnCount) - (brickPadding * 2);
    brickHeight = canvas.height * 0.05;
    bricks = [];
    for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1, color: getRandomColor() };
        }
    }
    console.log('Game elements updated'); // Debug log
}


function getRandomColor() {
    const colors = ["#e74c3c", "#8e44ad", "#3498db", "#1abc9c", "#f1c40f", "#e67e22"];
    return colors[Math.floor(Math.random() * colors.length)];
}

window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
