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

canvas.addEventListener("click", handleCanvasClickOrTouch);
canvas.addEventListener("touchstart", handleCanvasClickOrTouch);

function handleCanvasClickOrTouch(event) {
    event.preventDefault();
    const buttonWidth = 10 * canvas.width / 100; // 10% of the canvas width
    const buttonHeight = 5 * canvas.height / 100; // 5% of the canvas height
    const buttonX = (canvas.width - buttonWidth) / 2;
    const buttonY = (canvas.height / 2) + (canvas.height / 10); // Adjust position slightly
    const rect = canvas.getBoundingClientRect();
    const mouseX = (event.clientX || event.touches[0].clientX) - rect.left;
    const mouseY = (event.clientY || event.touches[0].clientY) - rect.top;

    console.log('MouseX:', mouseX, 'MouseY:', mouseY); // Debug log
    console.log('ButtonX:', buttonX, 'ButtonY:', buttonY, 'ButtonWidth:', buttonWidth, 'ButtonHeight:', buttonHeight); // Debug log

    if (
        mouseX > buttonX &&
        mouseX < buttonX + buttonWidth &&
        mouseY > buttonY &&
        mouseY < buttonY + buttonHeight
    ) {
        console.log('Restart button clicked or touched'); // Debug log
        resetGame();
    }
}

function resetGame() {
    gameOver = false;
    gameWon = false;
    updateGameElements();
    draw();
    console.log('Game reset'); // Debug log
}
