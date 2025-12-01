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
    makeCalendar(today.getFullYear(), today.getMonth(), assignments); 

    nameInput.value = "";
    dateInput.value = "";
});


    
  function displayAssignment({ name, date }) {
  const [year, month, day] = date.split("-");
  const localDate = new Date(Number(year), Number(month) - 1, Number(day));
  const entry = document.createElement("li");
  entry.textContent = `${name} — Due: ${localDate.toLocaleDateString()}`;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.style.marginLeft = "10px";

  removeBtn.addEventListener("click", () => {
  entry.remove();
  assignments = assignments.filter(
  (a) => !(a.name === name && a.date === date)
    );
  localStorage.setItem("assignments", JSON.stringify(assignments));
  makeCalendar(today.getFullYear(), today.getMonth(), assignments);
  });

  entry.appendChild(removeBtn);
  list.appendChild(entry);
}


function makeCalendar(year, month, assignments) {
  const calendarBody = document.getElementById("calendar-body");
  calendarBody.innerHTML = "";

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let row = document.createElement("tr");

  
  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("td");
    row.appendChild(emptyCell);
  }

  
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement("td");
    cell.textContent = day;

    
    const cellDate = new Date(year, month, day).toLocaleDateString();
    let hasAssignment = false;
    const names = [];

    for (let j = 0; j < assignments.length; j++) {
    const [y, m, d] = assignments[j].date.split("-");
    const localDate = new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString();
    if (localDate === cellDate) {
    hasAssignment = true;
    names.push(assignments[j].name);
  }
}


    if (hasAssignment) {
      cell.style.backgroundColor = "#8ce2bd"; 
      cell.title = names.join(", ");
    }

    row.appendChild(cell);

    
    if ((firstDay + day) % 7 === 0 || day === daysInMonth) {
      calendarBody.appendChild(row);
      row = document.createElement("tr");
    }
  }
}


const today = new Date();
makeCalendar(today.getFullYear(), today.getMonth(), assignments);






