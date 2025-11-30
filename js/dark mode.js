// ---- DARK MODE TOGGLE (click-only but persistent) ---- //
document.addEventListener("DOMContentLoaded", () => {
    const darkModeBtn = document.getElementById("dark-mode-btn");

    // ONLY apply dark mode if it was intentionally enabled before
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
        document.body.classList.add("dark-mode");
    }

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            // Save user choice
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
            } else {
                localStorage.setItem("darkMode", "disabled");
            }
        });
    }
});
// ---- END DARK MODE TOGGLE ---- //
