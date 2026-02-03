// instructions.js

function drawInstr() {
  background(230, 235, 255);

  fill(20);
  textAlign(CENTER, TOP);

  textSize(38);
  text("Instructions", width / 2, 90);

  textSize(18);
  text(
    "This is a branching interactive story.\n\n" +
      "Controls:\n" +
      "- Click buttons OR press 1 / 2 to choose\n" +
      "- Press R to restart the story\n\n" +
      "Stat:\n" +
      "- Your choices change KARMA\n" +
      "- Endings unlock based on your final KARMA\n\n" +
      "Click anywhere (or press B) to go back.",
    width / 2,
    180,
    640,
  );

  cursor(HAND);
}

function instrMousePressed() {
  currentScreen = "start";
}

function instrKeyPressed() {
  if (key === "b" || key === "B") currentScreen = "start";
}
