const winSound = document.getElementById("winSound");
const loseSound = document.getElementById("loseSound");

let currentLevel = 1;
const levels = 5; // Total number of levels
const speedIncrement = 0.5; // Speed increment for each level
let levelCompleted = false; // Initialize the levelCompleted flag
let soundPlayed = false;

function loadLevel(level) {
    // Remove any previously loaded level script
    const existingScript = document.getElementById('levelScript');
    if (existingScript) {
        document.head.removeChild(existingScript);
    }

    const script = document.createElement('script');
    script.src = `map0${level}.js`;
    script.id = 'levelScript';
    script.onload = () => {
        const levelData = window[`level${level}`];
        if (levelData) {
            initializeLevel(levelData);
        } else {
            console.error(`Level ${level} data not found`);
        }
    };
    document.head.appendChild(script);
}

function initializeLevel(levelData) {
    brickRowCount = levelData.brickRowCount;
    brickColumnCount = levelData.brickColumnCount;
    bricks = levelData.bricks;
    updateGameElements();
}

// Commented out background music functions
// function playBackgroundMusic() {
//     if (backgroundMusic.paused) {
//         backgroundMusic.play().catch(error => {
//             console.error("Failed to play background music:", error);
//         });
//     }
// }

function startGame() {
    startButton.style.display = 'none'; // Hide the start button
    // if (backgroundMusic.paused) {
    //     backgroundMusic.play().catch(error => {
//         console.error("Failed to play background music:", error);
//     });
// }
    loadLevel(currentLevel); // Load the first level
    resizeCanvas(); // Ensure the canvas is correctly sized
    levelCompleted = false; // Reset level completion flag
    draw(); // Start the game loop
}

startButton.addEventListener("click", startGame);

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

    // Only set levelCompleted to true if there are no remaining bricks
    if (remainingBricks === 0 && bricks.length > 0) {
        levelCompleted = true;
    }
}


canvas.addEventListener("click", handleCanvasClickOrTouch);
canvas.addEventListener("touchstart", handleCanvasClickOrTouch);

function handleCanvasClickOrTouch(event) {
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
    currentLevel = 1;
    dx = initialSpeed;
    dy = initialSpeed;
    loadLevel(currentLevel);
    resizeCanvas(); // Ensure the canvas is correctly sized
    levelCompleted = false; // Reset level completion flag
    draw();
    console.log('Game reset'); // Debug log
}

canvas.addEventListener("click", handleCanvasClickOrTouch);
canvas.addEventListener("touchstart", handleCanvasClickOrTouch);

function handleCanvasClickOrTouch(event) {
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
