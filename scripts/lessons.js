console.log("✔ lessons.js loaded");
const STORAGE_KEY_DIFFICULTY = "mm_difficulty";

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
const saved = localStorage.getItem(STORAGE_KEY_DIFFICULTY);
if (saved) difficultyFilter.value = saved;
const lessonCardsEl = document.getElementById("lesson-cards");
const showEasyBtn = document.getElementById("show-easy");
const lessonOutput = document.getElementById("lesson-output");

let lessons = [];

async function loadLessons() {
  try {
    const res = await fetch("data/lessons.json");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    lessons = await res.json();
  } catch (err) {
    console.error("Could not load lessons.json:", err);
    if (lessonCardsEl) {
      lessonCardsEl.innerHTML = "<li>Could not load lessons. Run Live Server.</li>";
    }
  }
}

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

if (difficultyFilter) {
  difficultyFilter.addEventListener("change", () => {
    localStorage.setItem(STORAGE_KEY_DIFFICULTY, difficultyFilter.value);
    renderLessonCards();
  });
}

if (showEasyBtn && lessonOutput) {
  showEasyBtn.addEventListener("click", () => {
    if (difficultyFilter) {
      difficultyFilter.value = "easy";
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
  await loadLessons();
  renderLessonCards();
}

init();
