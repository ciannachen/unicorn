window.level2 = {
    brickRowCount: 2,
    brickColumnCount: 5,
    bricks: []
};

// Initialize the brick array for level 1
for (let c = 0; c < level2.brickColumnCount; c++) {
    level2.bricks[c] = [];
    for (let r = 0; r < level2.brickRowCount; r++) {
        level2.bricks[c][r] = { x: 0, y: 0, status: 1, color: getRandomColor() };
    }
}