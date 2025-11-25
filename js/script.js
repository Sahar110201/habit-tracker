// ----- TIMER -----
let timerDisplay = document.getElementById('timer-display');
let startBtn = document.getElementById('start-btn');
let pauseBtn = document.getElementById('pause-btn');
let resetBtn = document.getElementById('clean-btn');
let add5Btn = document.getElementById('add-5-btn');
let add10Btn = document.getElementById('add-10-btn');
let add20Btn = document.getElementById('add-20-btn');

let totalSeconds = 0;
let timerInterval = null;

// 🔊 Alarm sound (your uploaded file)
const alarmSound = new Audio("sound/alarm-301729.mp3");
alarmSound.preload = "auto";
alarmSound.loop = false;   // 🔥 Make sure sound does NOT repeat

// Update display
function updateDisplay() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerDisplay.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start Timer
startBtn.addEventListener('click', () => {

    // 🔥 OPTION 2: stop/reset alarm when starting new timer
    alarmSound.pause();
    alarmSound.currentTime = 0;

    if (timerInterval) return;

    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();
        } else {
            clearInterval(timerInterval);
            timerInterval = null;

            // 🔊 Play alarm once
            alarmSound.play().catch(err => console.log("Audio error:", err));

            alert("Time's up!");
        }
    }, 1000);
});

// Pause
pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// Reset
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;

    // 🔥 Stop the alarm if it's still playing
    alarmSound.pause(5);
    alarmSound.currentTime = 5;

    updateDisplay();
});

// Time increment buttons
add5Btn.addEventListener('click', () => { totalSeconds += 5 * 60; updateDisplay(); });
add10Btn.addEventListener('click', () => { totalSeconds += 10 * 60; updateDisplay(); });
add20Btn.addEventListener('click', () => { totalSeconds += 20 * 60; updateDisplay(); });

// Initialize display
updateDisplay();
