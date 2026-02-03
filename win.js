// win.js

function drawWin() {
  background(200, 255, 200);

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(40);

  let title = "You Win!";
  let msg = "";

  if (endingId === "legend") {
    title = "LEGEND ENDING";
    msg =
      "You helped multiple strangers tonight.\n" +
      "People remember your kindness.\n";
  } else {
    title = "DECENT ENDING";
    msg =
      "You made more good choices than bad.\n" +
      "Not perfect, but you did the right thing.\n";
  }

  text(title, width / 2, 250);

  textSize(18);
  text(msg, width / 2, 330);

  textSize(18);
  text(`Final KARMA: ${karma}`, width / 2, 430);

  textSize(20);
  text("Click or press R to return to Start.", width / 2, 520);
}

function winMousePressed() {
  currentScreen = "start";
}

function winKeyPressed() {
  if (key === "r" || key === "R") currentScreen = "start";
}
