// scripts/dataService.js

// This builds the correct path to /data/lessons.json no matter where the script runs
const LESSONS_URL = new URL("../data/lessons.json", import.meta.url);

export async function loadLessons() {
  const res = await fetch(LESSONS_URL);

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} while loading lessons.json`);
  }

  return res.json();
}

export function findLessonById(lessons, id) {
  return lessons.find((l) => l.id === id);
}