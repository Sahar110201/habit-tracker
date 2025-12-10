document.addEventListener("DOMContentLoaded", () => {
    loadTasks();

    const addTaskBtn = document.getElementById("add-task-btn");
    addTaskBtn.addEventListener("click", addTask);
});


// ===============================
// Add a New Task
// ===============================
function addTask() {
    const taskInput = document.getElementById("task-input");
    const description = taskInput.value.trim();

    if (description === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        description: description
    };

    saveTask(task);
    displayTask(task);

    taskInput.value = "";
}


// ===============================
// Display Task
// ===============================
function displayTask(task) {
    const taskList = document.getElementById("task-list");

    const li = document.createElement("li");
    li.classList.add("task-item");
    li.setAttribute("data-task-id", task.id);

    li.innerHTML = `
        <span class="task-description">${task.description}</span>
        <div class="task-actions">
            <button class="complete-btn action-btn">Complete</button>
            <button class="edit-btn action-btn">Edit</button>
            <button class="delete-btn action-btn">Delete</button>
        </div>
    `;

    // Button functionality
    li.querySelector(".complete-btn").addEventListener("click", () => completeTask(task.id));
    li.querySelector(".edit-btn").addEventListener("click", () => editTask(task.id));
    li.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));

    taskList.appendChild(li);
}


// ===============================
// COMPLETE TASK → REMOVE
// ===============================
function completeTask(id) {
    deleteTask(id);  // completing = same as deleting
}


// ===============================
// Edit Task
// ===============================
function editTask(id) {
    let tasks = getSavedTasks();
    const task = tasks.find(t => t.id === id);

    const newDescription = prompt("Edit your task:", task.description);
    if (!newDescription) return;

    task.description = newDescription.trim();

    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTaskList();
}


// ===============================
// Delete Task
// ===============================
function deleteTask(id) {
    let tasks = getSavedTasks().filter(t => t.id !== id);

    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTaskList();
}


// ===============================
// Save Task
// ===============================
function saveTask(task) {
    let tasks = getSavedTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// ===============================
// Load Tasks
// ===============================
function loadTasks() {
    const tasks = getSavedTasks();
    tasks.forEach(task => displayTask(task));
}


// ===============================
// Get Tasks from Storage
// ===============================
function getSavedTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}


// ===============================
// Refresh
// ===============================
function refreshTaskList() {
    document.getElementById("task-list").innerHTML = "";
    loadTasks();
}
