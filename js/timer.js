// ----- TIMER -----
let startBtn = document.getElementById('start-btn');
let pauseBtn = document.getElementById('pause-btn');
let resetBtn = document.getElementById('reset-btn');
let add5Btn = document.getElementById('add-5-btn');
let add10Btn = document.getElementById('add-10-btn');
let add20Btn = document.getElementById('add-20-btn');

let minutesFlip = document.getElementById('minutes-flip');
let secondsFlip = document.getElementById('seconds-flip');

let totalSeconds = 0;
let timerInterval = null;
let flipRunning = false;

// 🔊 Alarm sound (ensure file exists at this path)
const alarmSound = new Audio("assets/images/alarm-301729.mp3");
alarmSound.preload = "auto";
alarmSound.loop = false;


// Helper function to animate flip
function animateFlip(element, newValue) {
    element.classList.add('flipping');
    setTimeout(() => {
        element.classList.remove('flipping');
        element.querySelector('.flip-card-front').textContent = newValue;
    }, 300);
}

// Update display 
function updateDisplay() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let minutesStr = minutes.toString().padStart(2, '0');
    let secondsStr = seconds.toString().padStart(2, '0');

    minutesFlip.querySelector('.flip-card-front').textContent = minutesStr;
    secondsFlip.querySelector('.flip-card-front').textContent = secondsStr;
}

// Start Timer
startBtn.addEventListener('click', () => {
    if (flipRunning) return;

    if (totalSeconds === 0) {
        alert('Please set a time using the +5, +10, or +20 min buttons!');
        return;
    }

    flipRunning = true;
    startBtn.disabled = true;

    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();

            // Animate flip when second changes
            if (totalSeconds % 60 === 59) {
                animateFlip(secondsFlip, (totalSeconds % 60).toString().padStart(2, '0'));
            }
            if (totalSeconds % 60 === 0) {
                animateFlip(minutesFlip, (Math.floor(totalSeconds / 60)).toString().padStart(2, '0'));
            }
            if (totalSeconds === 0) {
                animateFlip(minutesFlip, '00');
            }
        } else {
            clearInterval(timerInterval);
            flipRunning = false;
            startBtn.disabled = false;
            alarmSound.play().catch(err => console.log("Audio error:", err));

        }
    }, 1000);
});

// Pause
pauseBtn.addEventListener('click', () => {
    if (flipRunning) {
        clearInterval(timerInterval);
        flipRunning = false;
        startBtn.disabled = false;
    }
});

// Reset
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    flipRunning = false;
    timerInterval = null;
    totalSeconds = 0;
    startBtn.disabled = false;

    // 🔥 Stop the alarm if it's still playing
    alarmSound.pause();
    alarmSound.currentTime = 0;

    updateDisplay();
});

// Time increment buttons
add5Btn.addEventListener('click', () => {
    if (!flipRunning) {
        totalSeconds = 5 * 60;
        updateDisplay();
    }
});

add10Btn.addEventListener('click', () => {
    if (!flipRunning) {
        totalSeconds = 10 * 60;
        updateDisplay();
    }
});

add20Btn.addEventListener('click', () => {
    if (!flipRunning) {
        totalSeconds = 20 * 60; 
        updateDisplay();
    }
});

// Initialize display
updateDisplay();

