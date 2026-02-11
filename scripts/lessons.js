console.log("✔ lessons.js loaded");

// =========================================
// RANDOM PRACTICE TIP GENERATOR
// =========================================

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

    tipDisplay.style.color =
      randomTip.length > 45 ? "#FF6EC7" : "#4A90E2";
  });
} else {
  console.warn("Tip generator elements missing from the page.");
}

// =========================================
// LESSON DATA
// =========================================

const lessons = [
  { name: "Meet the Keyboard", level: "easy", id: 1 },
  { name: "Finger Numbers", level: "easy", id: 2 },
  { name: "Middle C", level: "easy", id: 3 },
  { name: "First Melody", level: "medium", id: 4 },
  { name: "Rhythm Basics", level: "medium", id: 5 },
  { name: "Simple Song Challenge", level: "hard", id: 6 }
];

// =========================================
// EASY LESSON BUTTON OUTPUT
// =========================================

const showEasyBtn = document.getElementById("show-easy");
const lessonOutput = document.getElementById("lesson-output");

if (showEasyBtn && lessonOutput) {
  showEasyBtn.addEventListener("click", () => {
    const easyLessons = lessons.filter((lesson) => lesson.level === "easy");

    lessonOutput.innerHTML = "";

    easyLessons.forEach((lesson) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="lesson.html?id=${lesson.id}">${lesson.name}</a>`;
      lessonOutput.appendChild(li);
    });
  });
} else {
  console.warn("Lesson filter elements missing from the page.");
}

// =========================================
// DROPDOWN FILTER (Difficulty)
// =========================================

const difficultyFilter = document.getElementById("difficulty-filter");
const lessonCards = Array.from(document.querySelectorAll(".lesson-cards li"));

function applyDifficultyFilter() {
  if (!difficultyFilter) return;

  const selected = difficultyFilter.value;

  lessonCards.forEach((li) => {
    const text = li.textContent.toLowerCase();

    const isEasy = text.includes("(easy)");
    const isMedium = text.includes("(medium)");
    const isHard = text.includes("(hard)");

    let show = true;

    if (selected === "easy") show = isEasy;
    if (selected === "medium") show = isMedium;
    if (selected === "hard") show = isHard;

    li.style.display = show ? "list-item" : "none";
  });
}

if (difficultyFilter) {
  difficultyFilter.addEventListener("change", applyDifficultyFilter);
}
