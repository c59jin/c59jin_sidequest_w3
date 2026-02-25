## Project Title

GBDA302 Week 3: Branching Interactive Story – Midnight Metro

---

## Author

Catarina Jin - c59jin - 21077832

---

## Description

Midnight Metro is a branching interactive narrative built in p5.js using a multi-state screen system and modular file structure. The player navigates a decision tree where each choice affects a tracked stat called KARMA.

---

## Setup and Interaction Instructions

How to Run:

Open the project folder in Visual Studio Code.

Use Live Server or open index.html in a browser.

The game will load automatically.

Controls:

Mouse:

Click buttons to make choices

Keyboard:

Press 1 for left choice

Press 2 for right choice

Press R to restart the story

## Iteration Notes

a. Post-Playtest: Changes Made

Based on peer feedback, the following adjustments were implemented:

Improved Ending Clarity
Players were unsure why they received certain endings. The final KARMA value is now displayed on the win/lose screen to clearly show how choices influenced the outcome.

Structured Story Object Refactor
Early versions used conditional branching logic. The story was restructured into a centralized STORY object to improve scalability and readability.

Keyboard Accessibility Added
Keyboard controls (1, 2, R) were added to improve accessibility and usability beyond mouse interaction.

b. Post-Showcase: Planned Improvements

Add Visual Karma Indicator
A visual meter or progress bar will replace the numeric karma display to make the stat system more intuitive.

Add Scene Visual Differentiation
Each story node could include background variations or simple animations to better distinguish locations.

Add Sound Design
Sound effects for positive/negative choices and distinct ending themes will improve emotional feedback.

---

## Assets

All code was written by me.
GenAI was used to help structure the multi-file state system, refine branching logic, and assist with commenting and debugging. I reviewed and verified all generated code before submission.

---

## References

Friedman, B., Hendry, D. 2019. Value Sensitive Design: Shaping Technology with Moral Imagination. MIT Press.

---
