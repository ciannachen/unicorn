window.level1 = {
    brickRowCount: 1,
    brickColumnCount: 5,
    bricks: []
};

// Initialize the brick array for level 1
for (let c = 0; c < level1.brickColumnCount; c++) {
    level1.bricks[c] = [];
    for (let r = 0; r < level1.brickRowCount; r++) {
        level1.bricks[c][r] = { x: 0, y: 0, status: 1, color: getRandomColor() };
    }
}
