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
    const trophyIcon = document.getElementById('trophyIcon');
    const iconWidth = 100;
    const iconHeight = 100;
    const offsetY = 100; // Adjust this value as needed to move the trophy up

    trophyIcon.onload = function() {
        ctx.drawImage(trophyIcon, (canvas.width - iconWidth) / 2, (canvas.height - iconHeight) / 2 - offsetY, iconWidth, iconHeight);
    };

    if (trophyIcon.complete) {
        ctx.drawImage(trophyIcon, (canvas.width - iconWidth) / 2, (canvas.height - iconHeight) / 2 - offsetY, iconWidth, iconHeight);
    }
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

            // Reset dx based on paddle movement
            const paddleMovement = paddleX - previousPaddleX;
            const speedFactor = 0.35; // Factor to influence the ball's speed based on paddle movement
            dx = (dx > 0 ? 1 : -1) * Math.abs(dx + paddleMovement * speedFactor);

            // Ensure dx is not zero
            if (dx === 0) {
                dx = (Math.random() - 0.5) * 2;
            }

            paddleHitSound.play();
            console.log('Paddle hit sound played'); // Debug log
        } else {
            gameOver = true;
        }
    }

    x += dx;
    y += dy;

    const paddleSpeed = 10; // Increase this value to make the paddle move faster

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        previousPaddleX = paddleX; // Update previous paddle position
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        previousPaddleX = paddleX; // Update previous paddle position
        paddleX -= paddleSpeed;
    } else {
        previousPaddleX = paddleX; // Ensure previousPaddleX is always updated
    }

    if (levelCompleted) {
        if (currentLevel < levels) {
            currentLevel++;
            winSound.play();
            dx += speedIncrement; // Increase speed
            dy += speedIncrement; // Increase speed
            loadLevel(currentLevel); // Load next level
            levelCompleted = false; // Reset level completion flag
        } else {
            gameWon = true;
            gameOver = true;
            winSound.play(); // Play the win sound for the final level
        }
    }

    if (gameOver) {
        if (gameWon) {
            drawMessage("You Win!");
            drawTrophy();
        } else {
            loseSound.play();
            drawMessage("Game Over");
        }
    } else {
        requestAnimationFrame(draw);
    }
    // console.log('Draw loop executed'); // Debug log
}
