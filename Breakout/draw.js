function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff9800"; // Orange color for the ball
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    const paddleYOffset = canvas.height * 0.04; // Move paddle up by 4% of the screen height
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight - paddleYOffset, paddleWidth, paddleHeight);
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

function drawRestartButton() {
    const buttonPadding = 20;
    ctx.font = "20px Arial";
    const text = "Restart";
    const textWidth = ctx.measureText(text).width;
    const buttonWidth = textWidth + buttonPadding;
    const buttonHeight = 50;
    const buttonX = (canvas.width - buttonWidth) / 2;
    const buttonY = (canvas.height / 2) + (canvas.height / 10); // Adjust position slightly

    ctx.beginPath();
    ctx.rect(buttonX, buttonY, buttonWidth, buttonHeight);
    ctx.fillStyle = "#ff9800"; // Button color
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, buttonX + buttonWidth / 2, buttonY + buttonHeight / 2);
}

function drawMessage(message) {
    ctx.font = "24px Arial";
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.fillText(message, canvas.width / 2, canvas.height / 2 - 20);
    drawRestartButton();
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

    const paddleYOffset = canvas.height * 0.04;

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
        wallHitSound.play();
        console.log('Wall hit sound played'); // Debug log
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        wallHitSound.play();
        console.log('Wall hit sound played'); // Debug log
    } else if (y + dy > canvas.height - ballRadius - paddleHeight - paddleYOffset) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
            paddleHitSound.play();
            console.log('Paddle hit sound played'); // Debug log
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
        }
    } else {
        requestAnimationFrame(draw);
    }
    console.log('Draw loop executed'); // Debug log
}
