document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("due-date-form");
    const nameInput = document.getElementById("assignment-name");
    const dateInput = document.getElementById("due-date");
    const list = document.getElementById("assignment-list");

    
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

    
    assignments.forEach(displayAssignment);

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const date = dateInput.value;

        if (!name || !date) {
            alert("Please enter both assignment name and due date.");
            return;
        }

        const assignment = { name, date };
        assignments.push(assignment);

        localStorage.setItem("assignments", JSON.stringify(assignments));

        displayAssignment(assignment);

        nameInput.value = "";
        dateInput.value = "";
    });

    function displayAssignment({ name, date }) {
        const entry = document.createElement("li");
        entry.textContent = `${name} — Due: ${new Date(date).toLocaleDateString()}`;
        list.appendChild(entry);
    }
});
