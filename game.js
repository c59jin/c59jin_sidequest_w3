// game.js
// NOTE: Do NOT add setup() or draw() in this file.
// main.js calls drawGame() when currentScreen === "game".

// ------------------------------
// Choice button data (two buttons)
// ------------------------------
const leftBtn = { x: 260, y: 610, w: 300, h: 90, label: "" };
const rightBtn = { x: 540, y: 610, w: 300, h: 90, label: "" };

// ------------------------------
// Decision tree (branching story)
// Each node has text + two choices.
// choice: { label, karmaDelta, next }
// next can be another node id OR "END_CHECK"
// ------------------------------
const STORY = {
  intro: {
    title: "Midnight Metro",
    text:
      "The last train is almost empty.\n" +
      "A stranger drops their phone and doesn't notice.\n\n" +
      "What do you do?",
    choices: [
      { label: "Pick it up + chase them", karmaDelta: +1, next: "chase" },
      { label: "Pocket it quietly", karmaDelta: -1, next: "pocket" },
    ],
  },

  chase: {
    title: "Closing Doors",
    text:
      "You sprint toward the doors.\n" +
      "The stranger is stepping off.\n\n" +
      "How do you get their attention?",
    choices: [
      { label: "Call out loudly", karmaDelta: +1, next: "platform_guard" },
      {
        label: "Tap their shoulder (carefully)",
        karmaDelta: 0,
        next: "platform_guard",
      },
    ],
  },

  pocket: {
    title: "Vibration in Your Pocket",
    text: "The phone buzzes.\n" + "Caller ID: “MOM”.\n\n" + "What do you do?",
    choices: [
      {
        label: "Answer: 'I found this phone'",
        karmaDelta: +1,
        next: "platform_guard",
      },
      { label: "Power it off", karmaDelta: -1, next: "platform_guard" },
    ],
  },

  platform_guard: {
    title: "Station Platform",
    text:
      "A security guard points at you.\n" +
      "“Hey! Did you see someone lose something?”\n\n" +
      "How do you respond?",
    choices: [
      { label: "Tell the truth", karmaDelta: 0, next: "help_or_hide" },
      { label: "Lie to avoid trouble", karmaDelta: -1, next: "help_or_hide" },
    ],
  },

  help_or_hide: {
    title: "A Choice of Direction",
    text:
      "The guard looks overwhelmed.\n" +
      "You spot two paths:\n" +
      "- A bright 24h cafe\n" +
      "- A dim alley exit\n\n" +
      "Where do you go next?",
    choices: [
      { label: "Go to the cafe (safe, public)", karmaDelta: +1, next: "cafe" },
      { label: "Slip into the alley (quiet)", karmaDelta: -1, next: "alley" },
    ],
  },

  cafe: {
    title: "24h Cafe",
    text:
      "Inside, you find a wallet on the counter.\n" +
      "It's full of cash and an ID.\n\n" +
      "Final choice:",
    choices: [
      { label: "Return it to staff", karmaDelta: +1, next: "END_CHECK" },
      { label: "Take it and leave", karmaDelta: -2, next: "END_CHECK" },
    ],
  },

  alley: {
    title: "Alley Exit",
    text:
      "Trash cans. Neon puddles.\n" +
      "A wallet lies near the curb.\n\n" +
      "Final choice:",
    choices: [
      { label: "Turn it in at the station", karmaDelta: +1, next: "END_CHECK" },
      { label: "Keep it (no one saw)", karmaDelta: -2, next: "END_CHECK" },
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

  // Stat display (karma)
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
  text("Press 1 (left) or 2 (right). Press R to restart.", width / 2, 720);
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
  if (choice.next === "END_CHECK") resolveEnding();
  else storyNode = choice.next;
}

// ------------------------------
// Ending logic based on karma
// Unlocks different endings
// ------------------------------
function resolveEnding() {
  // Possible karma range is roughly -6 to +5 depending on choices
  if (karma >= 3) {
    endingId = "legend";
    currentScreen = "win";
  } else if (karma >= 1) {
    endingId = "decent";
    currentScreen = "win";
  } else if (karma <= -3) {
    endingId = "caught";
    currentScreen = "lose";
  } else {
    endingId = "regret";
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
  if (key === "r" || key === "R") startNewGame();
}
