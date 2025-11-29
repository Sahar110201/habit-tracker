// ---- DARK MODE TOGGLE ---- //
const darkModeBtn = document.getElementById("dark-mode-btn");

// Toggle dark mode when button is clicked
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Save preference
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});
// ---- END DARK MODE TOGGLE ---- //

// ---- DARK MODE TOGGLE ---- //
document.getElementById("dark-mode-btn").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
// Toggle dark mode when button clicked
darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    // Save preference
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
});
// ---- END DARK MODE TOGGLE ---- //