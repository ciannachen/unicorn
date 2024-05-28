startButton.addEventListener("click", () => {
    startButton.style.display = 'none'; // Hide the start button
    resizeCanvas(); // Ensure the canvas is correctly sized
    draw(); // Start the game loop
});

function collisionDetection() {
    let remainingBricks = 0;
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            const b = bricks[c][r];
            if (b.status === 1) {
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
                    console.log('Brick hit sound played'); // Debug log
                }
            }
        }
    }
    if (remainingBricks === 0) {
        gameWon = true;
        gameOver = true;
    }
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
        console.log('Wall hit sound played'); // Debug log
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        wallHitSound.play();
        console.log('Wall hit sound played'); // Debug log
    } else if (y + dy > canvas.height - ballRadius) {
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
