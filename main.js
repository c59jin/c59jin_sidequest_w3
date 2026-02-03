// ------------------------------------------------------------
// main.js = the “router” (traffic controller) for the whole game
// ------------------------------------------------------------

// ------------------------------
// Global screen state
// ------------------------------
let currentScreen = "start"; // "start" | "instr" | "game" | "win" | "lose"

// ------------------------------
// Shared story state (used across files)
// ------------------------------
let karma = 0; // player stat
let storyNode = "intro";
let endingId = ""; // which ending text to show on win/lose screens

// Reset everything + jump into game
function startNewGame() {
  karma = 0;
  storyNode = "intro";
  endingId = "";
  currentScreen = "game";
}

// ------------------------------
// setup() runs ONCE at the beginning
// ------------------------------
function setup() {
  createCanvas(800, 800);
  textFont("sans-serif");
}

// ------------------------------
// draw() runs every frame
// ------------------------------
function draw() {
  if (currentScreen === "start") drawStart();
  else if (currentScreen === "instr") drawInstr();
  else if (currentScreen === "game") drawGame();
  else if (currentScreen === "win") drawWin();
  else if (currentScreen === "lose") drawLose();
}

// ------------------------------
// mousePressed() routes input
// ------------------------------
function mousePressed() {
  if (currentScreen === "start") startMousePressed();
  else if (currentScreen === "instr") instrMousePressed?.();
  else if (currentScreen === "game") gameMousePressed?.();
  else if (currentScreen === "win") winMousePressed?.();
  else if (currentScreen === "lose") loseMousePressed?.();
}

// ------------------------------
// keyPressed() routes input
// ------------------------------
function keyPressed() {
  if (currentScreen === "start") startKeyPressed();
  else if (currentScreen === "instr") instrKeyPressed?.();
  else if (currentScreen === "game") gameKeyPressed?.();
  else if (currentScreen === "win") winKeyPressed?.();
  else if (currentScreen === "lose") loseKeyPressed?.();
}

// ------------------------------------------------------------
// Shared helper function: isHover()
// ------------------------------------------------------------
function isHover({ x, y, w, h }) {
  return (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  );
}
