document.addEventListener("DOMContentLoaded", () => {

    const quotes = [
            "You are stronger than you think.",
            "Success is built on consistency.",
            "You've got this.",
            "Great things take time.",
            "Every day is a second chance.",
            "Everything takes time.",
            "Small steps every day lead to big results.",
            "The future depends on what you do today.",
            "Everyday is a second chance.",
            "Stay positive and work hard.",
            "Do your best.",
            "Believe in yourself.",
            "Be kind to yourself.",
            "Every effort counts.",
            "Your future is bright.",
    ];

    let lastIndex = -1; 

    const frontText = document.getElementById("welcome-text");
    const backText = document.getElementById("quote-text");
    const btn = document.getElementById("generate-quote-btn");
    const flipCard = document.querySelector(".flip-card");
    const timerEl = document.getElementById("quote-timer");

if (!btn || !frontText || !backText || !flipCard) return;

    const STORAGE_TEXT_KEY = "motivationQuoteText";
    const STORAGE_DATE_KEY = "motivationQuoteDate";
    const fallbackTimeZone = "America/New_York"; // EST fallback
    let countdownInterval = null;

    function getRandomIndex() {
        if (quotes.length === 0) return -1;
        if (quotes.length === 1) return 0;
        let i;
        do {
            i = Math.floor(Math.random() * quotes.length);
        } while (i === lastIndex);
        return i;
    }

    function getTodayKey(timeZone) {
        return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
    }

    let activeTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || fallbackTimeZone;

    // Try to get permission; fallback to EST if denied
    if (navigator.geolocation && navigator.permissions) {
        navigator.permissions.query({ name: "geolocation" }).then(result => {
            if (result.state === "granted") {
                // Use local tz (already set)
            } else if (result.state === "denied") {
                activeTimeZone = fallbackTimeZone;
            }
        }).catch(() => {
            activeTimeZone = fallbackTimeZone;
        });
    }

    function getTzParts(timeZone) {
        const now = new Date();
        const parts = new Intl.DateTimeFormat("en-US", {
            timeZone,
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        }).formatToParts(now).reduce((acc, p) => {
            acc[p.type] = p.value;
            return acc;
        }, {});
        const year = Number(parts.year);
        const month = Number(parts.month);
        const day = Number(parts.day);
        const hour = Number(parts.hour);
        const minute = Number(parts.minute);
        const second = Number(parts.second);
        const currentUtcMs = Date.UTC(year, month - 1, day, hour, minute, second);
        const nextMidnightUtc = Date.UTC(year, month - 1, day + 1, 0, 0, 0);
        return { currentUtcMs, nextMidnightUtc };
    }

    function msUntilNextQuote() {
        const { currentUtcMs, nextMidnightUtc } = getTzParts(activeTimeZone || fallbackTimeZone);
        return Math.max(0, nextMidnightUtc - currentUtcMs);
    }

    function formatDuration(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    function startCountdown() {
        if (!timerEl) return;
        clearInterval(countdownInterval);
        const tick = () => {
            const msLeft = msUntilNextQuote();
            if (msLeft <= 0) {
                clearInterval(countdownInterval);
                countdownInterval = null;
                localStorage.removeItem(STORAGE_DATE_KEY);
                localStorage.removeItem(STORAGE_TEXT_KEY);
                flipCard.classList.remove("flipped");
                frontText.style.opacity = "1";
                backText.textContent = "";
                btn.disabled = false;
                btn.textContent = "Generate";
                timerEl.textContent = "";
                return;
            }
            timerEl.textContent = `Next quote in ${formatDuration(msLeft)}`;
        };
        tick();
        countdownInterval = setInterval(tick, 1000);
    }

    function stopCountdown() {
        if (!timerEl) return;
        clearInterval(countdownInterval);
        countdownInterval = null;
        timerEl.textContent = "";
    }

    function setQuote(text) {
        backText.textContent = text;
        flipCard.classList.add("flipped");
        btn.disabled = true;
        btn.textContent = "Come back tomorrow";
        startCountdown();
    }

    function hydrateSavedQuote() {
        const savedDate = localStorage.getItem(STORAGE_DATE_KEY);
        const savedText = localStorage.getItem(STORAGE_TEXT_KEY);
        const today = getTodayKey(activeTimeZone);
        if (savedDate && savedText && savedDate === today) {
            setQuote(savedText);
            return true;
        }
        // new day: clear stale
        localStorage.removeItem(STORAGE_DATE_KEY);
        localStorage.removeItem(STORAGE_TEXT_KEY);
        btn.disabled = false;
        btn.textContent = "Generate";
        flipCard.classList.remove("flipped");
        frontText.style.opacity = "1";
        backText.textContent = "";
        stopCountdown();
        return false;
    }

    hydrateSavedQuote();

    btn.addEventListener("click", () => {
        if (btn.disabled) return;
        const i = getRandomIndex();
        if (i === -1) return;
        lastIndex = i;
        frontText.style.opacity = "0";
        backText.textContent = quotes[i];
        flipCard.classList.add("flipped");
        const today = getTodayKey(activeTimeZone);
        localStorage.setItem(STORAGE_TEXT_KEY, quotes[i]);
        localStorage.setItem(STORAGE_DATE_KEY, today);
        btn.disabled = true;
        btn.textContent = "Come back tomorrow";
        startCountdown();
    });
});
