// ======================================
// RESPONSIVE NAVIGATION
// ======================================

const menuButton = document.querySelector("#menuButton");
const siteNav = document.querySelector("#siteNav");

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    siteNav.classList.toggle("open");

    const isOpen = siteNav.classList.contains("open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });
}

// ======================================
// PRACTICE TRACKER SCRIPT
// ======================================

const userStats = {
  name: "Student",
  minutesToday: 0,
  totalMinutes: 0
};

const display = document.querySelector("#practice-display");
const addFiveBtn = document.querySelector("#add-5");
const resetBtn = document.querySelector("#reset");

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