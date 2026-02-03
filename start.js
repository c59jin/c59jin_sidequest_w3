// start.js

function drawStart() {
  background(180, 225, 220);

  fill(30, 50, 60);
  textSize(46);
  textAlign(CENTER, CENTER);
  text("Midnight Metro", width / 2, 170);

  textSize(18);
  fill(40, 60, 70);
  text("A branching story with a KARMA stat.", width / 2, 230);

  const startBtn = {
    x: width / 2,
    y: 340,
    w: 260,
    h: 80,
    label: "START STORY",
  };
  const instrBtn = {
    x: width / 2,
    y: 450,
    w: 260,
    h: 80,
    label: "INSTRUCTIONS",
  };

  drawButton(startBtn);
  drawButton(instrBtn);

  const over = isHover(startBtn) || isHover(instrBtn);
  cursor(over ? HAND : ARROW);
}

function startMousePressed() {
  const startBtn = { x: width / 2, y: 340, w: 260, h: 80 };
  const instrBtn = { x: width / 2, y: 450, w: 260, h: 80 };

  if (isHover(startBtn)) {
    startNewGame(); // IMPORTANT: resets karma + storyNode
  } else if (isHover(instrBtn)) {
    currentScreen = "instr";
  }
}

function startKeyPressed() {
  if (keyCode === ENTER) startNewGame();
  if (key === "i" || key === "I") currentScreen = "instr";
}

// Helper button draw
function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });

  noStroke();
  if (hover) {
    fill(255, 200, 150, 220);
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 180, 120);
  } else {
    fill(255, 240, 210, 210);
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(220, 220, 220);
  }

  rect(x, y, w, h, 14);
  drawingContext.shadowBlur = 0;

  fill(40, 60, 70);
  textSize(26);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}
