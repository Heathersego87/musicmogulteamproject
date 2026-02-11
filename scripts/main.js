// ======================================
// PRACTICE TRACKER SCRIPT
// ======================================

// User stats object
const userStats = {
  name: "Student",
  minutesToday: 0,
  totalMinutes: 0
};

// DOM elements
const display = document.querySelector("#practice-display");
const addFiveBtn = document.querySelector("#add-5");
const resetBtn = document.querySelector("#reset");

// Make sure elements exist before attaching listeners
if (display && addFiveBtn && resetBtn) {

  function updateDisplay() {
    display.innerHTML = `
      You've practiced <strong>${userStats.minutesToday}</strong> minutes today!
    `;
  }

  addFiveBtn.addEventListener("click", () => {
    userStats.minutesToday += 5;
    userStats.totalMinutes += 5;
    updateDisplay();
  });

  resetBtn.addEventListener("click", () => {
    userStats.minutesToday = 0;
    updateDisplay();
  });

  updateDisplay();

} else {
  console.warn("Practice tracker elements missing from the page.");
}
