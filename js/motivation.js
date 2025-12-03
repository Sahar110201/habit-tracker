document.addEventListener("DOMContentLoaded", () => {

    const quotes = [
            "You are stronger than you think.",
            "Success is built on consistency.",
            "You've got this.",
            "Great things take time",
            "Every day is a second chance",
            "Everything takes time",
            "Small steps every day lead to big results",
            "The future depends on what you do today",
            "Everyday is a second chance",
            "Stay positive and work hard",
            "Do your best",
            "Believe in yourself",
            "Be kind to yourself",
            "Every effort counts",
            "Your future is bright",
    ];

    let index = 0; 

    const text = document.getElementById("welcome-text");
    const btn = document.getElementById("generate-quote-btn");
    const flipCard = document.querySelector(".flip-card");


        btn.addEventListener("click", () => {
            
            text.textContent = quotes[index];
        
            flipCard.classList.add("flipped");

            index++;
            if (index >= quotes.length) {
                index =0;
            }
        });
});