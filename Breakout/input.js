document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
canvas.addEventListener("touchstart", touchStartHandler, false);
canvas.addEventListener("touchmove", touchMoveHandler, false);
canvas.addEventListener("touchend", touchEndHandler, false);

let touchX = null; // To store the touch position

function keyDownHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }
}

function touchStartHandler(e) {
    e.preventDefault();
    const touch = e.touches[0];
    touchX = touch.clientX;
    updateTouchDirection();
}

function touchMoveHandler(e) {
    e.preventDefault();
    const touch = e.touches[0];
    touchX = touch.clientX;
    updateTouchDirection();
}

function touchEndHandler(e) {
    e.preventDefault();
    touchX = null;
    rightPressed = false;
    leftPressed = false;
}

function updateTouchDirection() {
    if (touchX < paddleX) {
        leftPressed = true;
        rightPressed = false;
    } else if (touchX > paddleX + paddleWidth) {
        rightPressed = true;
        leftPressed = false;
    } else {
        rightPressed = false;
        leftPressed = false;
    }
}
