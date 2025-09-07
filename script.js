// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Load tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Add task
addTaskBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);
  saveTask(taskText);

  taskInput.value = "";
}

// Create task element
function createTaskElement(text, isCompleted = false) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = text;
  if (isCompleted) span.classList.add("completed");

  span.addEventListener("click", () => {
    span.classList.toggle("completed");
    updateLocalStorage();
  });

  const actions = document.createElement("div");
  actions.classList.add("actions");

  // Edit button
  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.classList.add("edit-btn");
  editBtn.onclick = () => {
    const newTask = prompt("Edit task:", span.textContent);
    if (newTask) {
      span.textContent = newTask;
      updateLocalStorage();
    }
  };

  // Delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.onclick = () => {
    li.remove();
    updateLocalStorage();
  };

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);
  taskList.appendChild(li);
}

// Save task in localStorage
function saveTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}

// Update localStorage
function updateLocalStorage() {
  let tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      completed: li.querySelector(".task-text").classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
