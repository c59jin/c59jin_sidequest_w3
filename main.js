// main.js

let currentScreen = "start";

// ------------------------------
// Story + stat (shared across files)
// ------------------------------
let karma = 0; // player stat (tracks choices)
let storyNode = "intro"; // which story scene we are on
let endingId = ""; // which ending text to show

function startNewGame() {
  karma = 0;
  storyNode = "intro";
  endingId = "";
  currentScreen = "game";
}

function returnToStart() {
  currentScreen = "start";
}

function setup() {
  createCanvas(800, 800);
}

function draw() {
  if (currentScreen === "start") drawStart();
  if (currentScreen === "instructions") drawInstructions();
  if (currentScreen === "game") drawGame();
  if (currentScreen === "win") drawWin();
  if (currentScreen === "lose") drawLose();
}

function mousePressed() {
  if (currentScreen === "start") startMousePressed();
  if (currentScreen === "instructions") instructionsMousePressed();
  if (currentScreen === "game") gameMousePressed();
  if (currentScreen === "win") winMousePressed();
  if (currentScreen === "lose") loseMousePressed();
}

function keyPressed() {
  if (currentScreen === "start") startKeyPressed();
  if (currentScreen === "instructions") instructionsKeyPressed();
  if (currentScreen === "game") gameKeyPressed();
  if (currentScreen === "win") winKeyPressed();
  if (currentScreen === "lose") loseKeyPressed();
}
