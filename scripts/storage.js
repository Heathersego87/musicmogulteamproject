const KEY_DIFFICULTY = "mm_difficulty";

export function loadDifficulty(defaultValue = "all") {
  return localStorage.getItem(KEY_DIFFICULTY) ?? defaultValue;
}

export function saveDifficulty(value) {
  localStorage.setItem(KEY_DIFFICULTY, value);
}