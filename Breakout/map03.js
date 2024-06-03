window.level3 = {
    brickRowCount: 3,
    brickColumnCount: 5,
    bricks: []
};

// Initialize the brick array for level 1
for (let c = 0; c < level3.brickColumnCount; c++) {
    level3.bricks[c] = [];
    for (let r = 0; r < level3.brickRowCount; r++) {
        level3.bricks[c][r] = { x: 0, y: 0, status: 1, color: getRandomColor() };
    }
}
