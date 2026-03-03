console.log("✔ lessonDetail.js loaded");

function getLessonIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  return Number.isFinite(id) ? id : null;
}

async function loadLessons() {
  const res = await fetch("data/lessons.json");
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function renderSteps(steps) {
  const list = document.getElementById("lesson-steps");
  if (!list) return;

  list.innerHTML = "";
  steps.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    list.appendChild(li);
  });
}

async function init() {
  const lessonId = getLessonIdFromUrl();

  if (!lessonId) {
    setText("lesson-title", "Lesson not found");
    setText("lesson-level", "");
    setText("lesson-description", "Missing or invalid lesson id in the URL.");
    return;
  }

  try {
    const lessons = await loadLessons();
    const lesson = lessons.find((l) => l.id === lessonId);

    if (!lesson) {
      setText("lesson-title", "Lesson not found");
      setText("lesson-level", "");
      setText("lesson-description", `No lesson matches id ${lessonId}.`);
      return;
    }

    setText("lesson-title", `${lesson.icon} ${lesson.title}`);
    setText("lesson-level", `(${lesson.level})`);
    setText("lesson-description", lesson.description);
    renderSteps(lesson.steps || []);
  } catch (err) {
    console.error(err);
    setText("lesson-title", "Could not load lesson");
    setText("lesson-level", "");
    setText("lesson-description", "Make sure Live Server is running and lessons.json exists.");
  }
}

init();