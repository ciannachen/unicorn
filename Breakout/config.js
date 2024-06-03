
function getRandomColor() {
    const hue = Math.floor(Math.random() * 360); // Hue value between 0 and 360
    const saturation = 100; // Full saturation for vivid colors
    const lightness = 50; // Medium lightness for bright colors

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}



const paddleHitSound = new Audio('hit.wav');
const brickHitSound = paddleHitSound;
const wallHitSound = paddleHitSound;

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
let brickRowCount;
let brickColumnCount;
let bricks = [];
let gameOver = false;
let gameWon = false;
let previousPaddleX;
const initialSpeed = 2; // Define an initial speed
const brickPadding = 10; // Define brickPadding
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
function updateGameElements() {
    ballRadius = canvas.width * 0.02;
    x = canvas.width / 2;
    const paddleYOffset = canvas.height * 0.04; // Move paddle up by 4% of the screen height
    y = canvas.height - paddleYOffset - paddleHeight - ballRadius; // Start the ball above the paddle

    // Randomize the initial direction of the ball
    const angle = Math.random() * Math.PI / 3 + Math.PI / 6; // Random angle between 30 and 150 degrees
    const speed = canvas.width * 0.01;
    dx = speed * Math.cos(angle) * (Math.random() < 0.5 ? -1 : 1); // Randomize the horizontal direction
    dy = -speed * Math.sin(angle); // Ensure it initially moves upward

    paddleHeight = canvas.height * 0.02;
    paddleWidth = canvas.width * 0.40; // Set paddle width to 40% of canvas width
    paddleX = (canvas.width - paddleWidth) / 2;
    previousPaddleX = paddleX; // Initialize previousPaddleX

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


const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    updateGameElements();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas(); // Initialize the canvas size on load
