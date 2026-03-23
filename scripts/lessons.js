import { loadLessons } from "./dataService.js";
import { loadDifficulty, saveDifficulty } from "./storage.js";
console.log("✔ lessons.js loaded");

// Random practice tip generator
const tips = [
  "Practice slowly first—speed comes later!",
  "Keep your wrists relaxed while you play.",
  "Use curved fingers like you're holding a bubble.",
  "Repeat small sections instead of the whole song.",
  "Say note names out loud as you play.",
  "Use a metronome to build strong rhythm.",
  "Take a short break every 10 minutes to stay fresh.",
  "Play hands separately before putting them together.",
  "Clap the rhythm before you play it.",
  "Smile—you learn faster when you're relaxed!"
];

const tipBtn = document.getElementById("tip-btn");
const tipDisplay = document.getElementById("tip-display");

if (tipBtn && tipDisplay) {
  tipBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * tips.length);
    const randomTip = tips[randomIndex];

    tipDisplay.textContent = randomTip;
    tipDisplay.style.color = randomTip.length > 45 ? "#FF6EC7" : "#4A90E2";
  });
} else {
  console.warn("Tip generator elements missing from the page.");
}

// Fetch and render lessons
const difficultyFilter = document.getElementById("difficulty-filter");
// Load saved dropdown choice on page load
difficultyFilter.value = loadDifficulty("all");
difficultyFilter.addEventListener("change", () => {
  saveDifficulty(difficultyFilter.value);
  renderLessonCards();
});
const lessonCardsEl = document.getElementById("lesson-cards");
const showEasyBtn = document.getElementById("show-easy");
const lessonOutput = document.getElementById("lesson-output");

let lessons = [];

function renderLessonCards() {
  if (!lessonCardsEl) return;

  const selected = difficultyFilter ? difficultyFilter.value : "all";

  const filtered =
    selected === "all"
      ? lessons
      : lessons.filter((lesson) => lesson.level === selected);

  lessonCardsEl.innerHTML = filtered
    .map(
      (lesson) => `
        <li>
          <a class="lesson-card" href="lesson.html?id=${lesson.id}">
            ${lesson.icon} ${lesson.title} <small>(${lesson.level})</small>
          </a>
        </li>
      `
    )
    .join("");
}

if (showEasyBtn && lessonOutput) {
  showEasyBtn.addEventListener("click", () => {
    if (difficultyFilter) {
      difficultyFilter.value = "easy";
      saveDifficulty("easy");
      renderLessonCards();
    }

    const easyLessons = lessons.filter((lesson) => lesson.level === "easy");
    lessonOutput.innerHTML = "";

    easyLessons.forEach((lesson) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="lesson.html?id=${lesson.id}">${lesson.title}</a>`;
      lessonOutput.appendChild(li);
    });
  });
} else {
  console.warn("Lesson filter elements missing from the page.");
}

async function init() {
  lessons = await loadLessons();
  renderLessonCards();
}

init();
