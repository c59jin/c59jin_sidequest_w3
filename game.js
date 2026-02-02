// game.js
// NOTE: Do NOT add setup() or draw() in this file.
// main.js calls drawGame() when currentScreen === "game".

// ------------------------------
// Choice button data (two buttons)
// ------------------------------
const leftBtn = { x: 260, y: 610, w: 300, h: 90, label: "" };
const rightBtn = { x: 540, y: 610, w: 300, h: 90, label: "" };

// ------------------------------
// Decision tree (story nodes)
// Each node has text + two choices.
// choice: { label, karmaDelta, next }
// next can be another node id OR "END_CHECK"
// ------------------------------
const STORY = {
  intro: {
    title: "Midnight Metro",
    text:
      "The last train is almost empty.\n" +
      "A stranger drops their phone and doesn’t notice.\n\n" +
      "What do you do?",
    choices: [
      { label: "Pick it up + return it", karmaDelta: +1, next: "platform" },
      { label: "Ignore and keep walking", karmaDelta: -1, next: "platform" },
    ],
  },

  platform: {
    title: "Station Platform",
    text:
      "A security guard points at you.\n" +
      "“Did you see anyone lose something?”\n\n" +
      "How do you respond?",
    choices: [
      { label: "Tell the truth", karmaDelta: 0, next: "cafe" },
      { label: "Lie to avoid trouble", karmaDelta: -1, next: "cafe" },
    ],
  },

  cafe: {
    title: "24h Cafe",
    text:
      "Inside the cafe, you find a wallet on the counter.\n" +
      "It’s full of cash and an ID.\n\n" +
      "Final choice:",
    choices: [
      { label: "Return it to staff", karmaDelta: +1, next: "END_CHECK" },
      { label: "Take it and leave", karmaDelta: -2, next: "END_CHECK" },
    ],
  },
};

// ------------------------------
// Main draw function (game screen)
// ------------------------------
function drawGame() {
  background(245, 235, 210);

  // Safety: recover if storyNode is invalid
  if (!STORY[storyNode]) storyNode = "intro";

  const node = STORY[storyNode];

  // --- Header ---
  fill(20);
  textAlign(CENTER, TOP);
  textSize(36);
  text(node.title, width / 2, 70);

  // Karma display (stat tracking)
  textSize(18);
  textAlign(LEFT, TOP);
  text(`KARMA: ${karma}`, 30, 30);

  // --- Story text ---
  fill(30);
  textAlign(CENTER, TOP);
  textSize(20);

  const boxX = width / 2;
  const boxY = 160;
  const boxW = 640;
  text(node.text, boxX, boxY, boxW);

  // --- Buttons ---
  leftBtn.label = node.choices[0].label;
  rightBtn.label = node.choices[1].label;

  drawChoiceButton(leftBtn);
  drawChoiceButton(rightBtn);

  // Cursor feedback
  const over = isHover(leftBtn) || isHover(rightBtn);
  cursor(over ? HAND : ARROW);

  // Keyboard hint
  textAlign(CENTER, TOP);
  textSize(14);
  fill(60);
  text(
    "Tip: Press 1 (left) or 2 (right) to choose. Press R to restart.",
    width / 2,
    720,
  );
}

// ------------------------------
// Button drawing helper
// ------------------------------
function drawChoiceButton({ x, y, w, h, label }) {
  rectMode(CENTER);
  const hover = isHover({ x, y, w, h });

  noStroke();
  fill(hover ? color(180, 220, 255, 230) : color(200, 220, 255, 190));
  rect(x, y, w, h, 14);

  fill(10);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(label, x, y, w - 30, h - 20);
}

// ------------------------------
// Apply a choice
// ------------------------------
function pickChoice(choiceIndex) {
  const node = STORY[storyNode];
  const choice = node.choices[choiceIndex];

  // Update stat
  karma += choice.karmaDelta;

  // Move story forward
  if (choice.next === "END_CHECK") {
    resolveEnding();
  } else {
    storyNode = choice.next;
  }
}

// ------------------------------
// Ending logic based on karma
// ------------------------------
function resolveEnding() {
  // thresholds (tweak anytime)
  if (karma >= 1) {
    endingId = karma >= 2 ? "hero" : "decent";
    currentScreen = "win";
  } else {
    endingId = karma <= -2 ? "caught" : "regret";
    currentScreen = "lose";
  }
}

// ------------------------------
// Mouse input
// ------------------------------
function gameMousePressed() {
  if (isHover(leftBtn)) pickChoice(0);
  else if (isHover(rightBtn)) pickChoice(1);
}

// ------------------------------
// Keyboard input (accessibility)
// ------------------------------
function gameKeyPressed() {
  if (key === "1") pickChoice(0);
  if (key === "2") pickChoice(1);

  // Restart quickly
  if (key === "r" || key === "R") {
    startNewGame();
  }
}
