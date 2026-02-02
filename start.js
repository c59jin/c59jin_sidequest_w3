// start.js

let startBtn = {
  x: 400,
  y: 450,
  w: 400,
  h: 100,
};

let instructionsBtn = {
  x: 400,
  y: 580,
  w: 400,
  h: 100,
};

function drawStart() {
  background(205, 230, 255);

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(46);
  text("Midnight Metro", width / 2, 180);

  textSize(18);
  text(
    "A branching interactive story.\nYour choices change KARMA and unlock different endings.",
    width / 2,
    260,
  );

  drawStartButton(startBtn, "START");
  drawStartButton(instructionsBtn, "INSTRUCTIONS");

  const over = isHover(startBtn) || isHover(instructionsBtn);
  cursor(over ? HAND : ARROW);
}

function drawStartButton(btn, label) {
  rectMode(CENTER);

  noStroke();
  fill(isHover(btn) ? 255 : 245);
  rect(btn.x, btn.y, btn.w, btn.h, 18);

  fill(0);
  textAlign(CENTER, CENTER);
  textSize(26);
  text(label, btn.x, btn.y);
}

function startMousePressed() {
  if (isHover(startBtn)) {
    startNewGame();
  } else if (isHover(instructionsBtn)) {
    currentScreen = "instructions";
  }
}

function startKeyPressed() {
  // Enter = start game
  if (keyCode === ENTER) {
    startNewGame();
  }

  // I = instructions
  if (key === "i" || key === "I") {
    currentScreen = "instructions";
  }
}

// Hover helper (used across screens)
function isHover(btn) {
  return (
    mouseX >= btn.x - btn.w / 2 &&
    mouseX <= btn.x + btn.w / 2 &&
    mouseY >= btn.y - btn.h / 2 &&
    mouseY <= btn.y + btn.h / 2
  );
}
