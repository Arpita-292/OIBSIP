// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingList = document.getElementById("pendingList");
const completedList = document.getElementById("completedList");

// This will store all tasks
let tasks = [];
let nextId = 1;

// Format date & time
function getCurrentDateTime() {
    const now = new Date();
    return now.toLocaleString();
}
function addTask() {
    const text = taskInput.value.trim();
    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const newTask = {
        id: nextId++,
        text: text,
        status: "pending",
        createdAt: getCurrentDateTime(),
        completedAt: null
    };

    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
}
addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});
function renderTasks() {
    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task-item");

        if (task.status === "completed") {
            li.classList.add("completed");
        }

        const mainDiv = document.createElement("div");
        mainDiv.classList.add("task-main");

        const textP = document.createElement("p");
        textP.classList.add("task-text");
        textP.textContent = task.text;

        const metaP = document.createElement("p");
        metaP.classList.add("task-meta");
        let metaText = `Added: ${task.createdAt}`;
        if (task.status === "completed" && task.completedAt) {
            metaText += ` | Completed: ${task.completedAt}`;
        }
        metaP.textContent = metaText;

        mainDiv.appendChild(textP);
        mainDiv.appendChild(metaP);

        const actionsDiv = document.createElement("div");
        actionsDiv.classList.add("task-actions");

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete-btn");
        completeBtn.textContent = task.status === "pending" ? "Mark Done" : "Mark Pending";
        completeBtn.addEventListener("click", () => toggleTaskStatus(task.id));

        const editBtn = document.createElement("button");
        editBtn.classList.add("edit-btn");
        editBtn.textContent = "Edit";
        editBtn.addEventListener("click", () => editTask(task.id));

        const deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete-btn");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteTask(task.id));

        actionsDiv.appendChild(completeBtn);
        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);

        li.appendChild(mainDiv);
        li.appendChild(actionsDiv);

        if (task.status === "pending") {
            pendingList.appendChild(li);
        } else {
            completedList.appendChild(li);
        }
    });
}
function toggleTaskStatus(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            if (task.status === "pending") {
                task.status = "completed";
                task.completedAt = getCurrentDateTime();
            } else {
                task.status = "pending";
                task.completedAt = null;
            }
        }
        return task;
    });

    renderTasks();
}
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    const newText = prompt("Edit your task:", task.text);
    if (newText === null) return;

    const trimmed = newText.trim();
    if (trimmed === "") {
        alert("Task cannot be empty.");
        return;
    }

    task.text = trimmed;
    renderTasks();
}
function deleteTask(id) {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}
renderTasks();
