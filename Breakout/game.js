const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");

const ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2; // Adjust horizontal speed here
let dy = -2; // Adjust vertical speed here

const paddleHeight = 10;
const paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1, color: getRandomColor() };
    }
}

// Load brick configuration from map.js
for (const brick of brickConfig) {
    bricks[brick.col][brick.row].color = brick.color;
}

const paddleHitSound = new Audio('paddle_hit.wav');
const brickHitSound = new Audio('brick_hit.wav');
const wallHitSound = new Audio('wall_hit.wav');

let gameOver = false;
let gameWon = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

startButton.addEventListener("click", () => {
    startButton.style.display = 'none'; // Hide the start button
    draw();
});

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    let remainingBricks = 0;
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status == 1) {
                remainingBricks++;
                if (
                    x > b.x &&
                    x < b.x + brickWidth &&
                    y > b.y &&
                    y < b.y + brickHeight
                ) {
                    dy = -dy;
                    b.status = 0;
                    brickHitSound.play();
                }
            }
        }
    }
    if (remainingBricks === 0) {
        gameWon = true;
        gameOver = true;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff9800"; // Orange color for the ball
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#ff5722"; // Deep orange color for the paddle
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = bricks[c][r].color;
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function drawMessage(message) {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}

function drawTrophy() {
    ctx.fillStyle = "#FFD700"; // Gold color

    // Base
    ctx.fillRect(canvas.width / 2 - 20, canvas.height / 2 + 10, 40, 10);
    ctx.fillRect(canvas.width / 2 - 15, canvas.height / 2, 30, 10);

    // Stem
    ctx.fillRect(canvas.width / 2 - 5, canvas.height / 2 - 40, 10, 40);

    // Handles
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 25, canvas.height / 2 - 40);
    ctx.quadraticCurveTo(canvas.width / 2 - 35, canvas.height / 2 - 60, canvas.width / 2 - 25, canvas.height / 2 - 70);
    ctx.moveTo(canvas.width / 2 + 25, canvas.height / 2 - 40);
    ctx.quadraticCurveTo(canvas.width / 2 + 35, canvas.height / 2 - 60, canvas.width / 2 + 25, canvas.height / 2 - 70);
    ctx.strokeStyle = "#FFD700";
    ctx.stroke();

    // Cup
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 25, canvas.height / 2 - 40);
    ctx.lineTo(canvas.width / 2 - 15, canvas.height / 2 - 60);
    ctx.lineTo(canvas.width / 2 + 15, canvas.height / 2 - 60);
    ctx.lineTo(canvas.width / 2 + 25, canvas.height / 2 - 40);
    ctx.closePath();
    ctx.fill();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        wallHitSound.play();
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        wallHitSound.play();
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            paddleHitSound.play();
        } else {
            gameOver = true;
        }
    }

    x += dx;
    y += dy;

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    if (gameOver) {
        if (gameWon) {
            drawMessage("You Win!");
            drawTrophy();
        } else {
            drawMessage("Game Over");
            drawTrophy();
        }
    } else {
        requestAnimationFrame(draw);
    }
}

function getRandomColor() {
    const colors = ["#e74c3c", "#8e44ad", "#3498db", "#1abc9c", "#f1c40f", "#e67e22"];
    return colors[Math.floor(Math.random() * colors.length)];
}
