// lose.js

function drawLose() {
  background(255, 210, 210);

  fill(0);
  textAlign(CENTER, CENTER);

  textSize(40);

  let title = "You Lose";
  let msg = "";

  if (endingId === "caught") {
    title = "CAUGHT ENDING";
    msg = "Too many shady choices.\n" + "Security stops you at the exit.\n";
  } else {
    title = "REGRET ENDING";
    msg =
      "Nothing dramatic happens...\n" +
      "but you feel the weight of your choices.\n";
  }

  text(title, width / 2, 250);

  textSize(18);
  text(msg, width / 2, 330);

  textSize(18);
  text(`Final KARMA: ${karma}`, width / 2, 430);

  textSize(20);
  text("Click or press R to return to Start.", width / 2, 520);
}

function loseMousePressed() {
  currentScreen = "start";
}

function loseKeyPressed() {
  if (key === "r" || key === "R") currentScreen = "start";
}
