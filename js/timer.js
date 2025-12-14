// ----- TIMER -----
let startBtn = document.getElementById('start-btn');
let pauseBtn = document.getElementById('pause-btn');
let resetBtn = document.getElementById('reset-btn');
let add1Btn = document.getElementById('add-1-btn');
let add5Btn = document.getElementById('add-5-btn');
let add10Btn = document.getElementById('add-10-btn');
let add20Btn = document.getElementById('add-20-btn');

let minutesFlip = document.getElementById('minutes-flip');
let secondsFlip = document.getElementById('seconds-flip');

let totalSeconds = 0;
let timerInterval = null;
let flipRunning = false;
const TIMER_STORAGE_KEY = 'timerSeconds';
const TIMER_TIMESTAMP_KEY = 'timerSavedAt';
const TIMER_MAX_AGE_MS = 12 * 60 * 60 * 1000;

// Alarm sound (ensure file exists at this path)
const alarmSound = new Audio("assets/images/alarm-301729.mp3");
alarmSound.preload = "auto";
alarmSound.loop = false;

function animateFlip(element, newValue) {
    element.classList.add('flipping');
    setTimeout(() => {
        element.classList.remove('flipping');
        element.querySelector('.flip-card-front').textContent = newValue;
    }, 300);
}

function updateDisplay() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    let minutesStr = minutes.toString().padStart(2, '0');
    let secondsStr = seconds.toString().padStart(2, '0');

    minutesFlip.querySelector('.flip-card-front').textContent = minutesStr;
    secondsFlip.querySelector('.flip-card-front').textContent = secondsStr;
    persistTimerState();
}

function loadTimerState() {
    const saved = parseInt(localStorage.getItem(TIMER_STORAGE_KEY), 10);
    const savedAt = parseInt(localStorage.getItem(TIMER_TIMESTAMP_KEY), 10);
    const now = Date.now();
    if (Number.isNaN(saved) || Number.isNaN(savedAt)) {
        clearSavedTimer();
        return;
    }
    if (saved <= 0 || (now - savedAt) > TIMER_MAX_AGE_MS) {
        clearSavedTimer();
        return;
    }
    totalSeconds = saved;
}

function persistTimerState() {
    if (totalSeconds > 0) {
        localStorage.setItem(TIMER_STORAGE_KEY, String(totalSeconds));
        localStorage.setItem(TIMER_TIMESTAMP_KEY, String(Date.now()));
    } else {
        clearSavedTimer();
    }
}

function clearSavedTimer() {
    localStorage.removeItem(TIMER_STORAGE_KEY);
    localStorage.removeItem(TIMER_TIMESTAMP_KEY);
}

function resetTimer() {
    clearInterval(timerInterval);
    flipRunning = false;
    timerInterval = null;
    totalSeconds = 0;
    startBtn.disabled = false;

    alarmSound.pause();
    alarmSound.currentTime = 0;

    updateDisplay();
}

function adjustTime(deltaSeconds) {
    if (flipRunning) return;
    const next = totalSeconds + deltaSeconds;
    if (next <= 0) {
        resetTimer();
        return;
    }
    totalSeconds = next;
    updateDisplay();
}

// Start Timer
startBtn.addEventListener('click', () => {
    if (flipRunning) return;

    if (totalSeconds === 0) {
        alert('Please set a time using the +1, +5, +10, or +20 min buttons!');
        return;
    }

    flipRunning = true;
    startBtn.disabled = true;

    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();

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
resetBtn.addEventListener('click', resetTimer);

// Time increment buttons (paused only)
add1Btn.addEventListener('click', () => adjustTime(60));
add5Btn.addEventListener('click', () => adjustTime(5 * 60));
add10Btn.addEventListener('click', () => adjustTime(10 * 60));
add20Btn.addEventListener('click', () => adjustTime(20 * 60));

// Initialize display
loadTimerState();
updateDisplay();
