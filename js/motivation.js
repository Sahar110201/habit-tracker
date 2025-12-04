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

if (!btn || !frontText || !backText || !flipCard) return;

    function getRandomIndex() {
        if (quotes.length === 0) return -1;
        if (quotes.length === 1) return 0;
        let i;
        do {
            i = Math.floor(Math.random() * quotes.length);
        } while (i === lastIndex);
        return i;
    }

    btn.addEventListener("click", () => {
        const i = getRandomIndex();
        if (i === -1) return;
        lastIndex = i;
        frontText.style.opacity = "0";
        backText.textContent = quotes[i];
        flipCard.classList.add("flipped");
    });
});