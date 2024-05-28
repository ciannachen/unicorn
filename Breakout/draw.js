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
            if (bricks[c][r].status === 1) {
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
