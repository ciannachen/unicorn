startButton.addEventListener("click", () => {
    startButton.style.display = 'none'; // Hide the start button
    resizeCanvas(); // Ensure the canvas is correctly sized

    // Unlock audio context
    paddleHitSound.play().then(() => {
        paddleHitSound.pause();
        paddleHitSound.currentTime = 0;
        console.log('Audio context unlocked');
        draw(); // Start the game loop
    }).catch(err => {
        console.error("Error in unlocking audio context: ", err);
        draw(); // Continue drawing even if the audio context unlock fails
    });
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
