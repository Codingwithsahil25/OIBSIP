document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function loadTasks() {
    const pendingList = document.getElementById("pending-tasks");
    const completedList = document.getElementById("completed-tasks");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    pendingList.innerHTML = "";
    completedList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskItem = document.createElement("li");
        taskItem.classList.add("task-item");
        if (task.completed) {
            taskItem.classList.add("completed-task");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", function () {
            task.completed = checkbox.checked;
            saveTasks(tasks);
            loadTasks();
        });

        const dueDate = document.createElement("span");
        dueDate.innerText = task.dueDate || "No Due Date";

        const editButton = document.createElement("button");
        editButton.innerText = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", function () {
            const updatedText = prompt("Edit task:", task.text);
            if (updatedText !== null) {
                task.text = updatedText;
                saveTasks(tasks);
                loadTasks();
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
            tasks.splice(index, 1);
            saveTasks(tasks);
            loadTasks();
        });

        taskItem.appendChild(checkbox);
        taskItem.appendChild(document.createTextNode(task.text));
        taskItem.appendChild(dueDate);
        taskItem.appendChild(editButton);
        taskItem.appendChild(deleteButton);

        if (task.completed) {
            completedList.appendChild(taskItem);
        } else {
            pendingList.appendChild(taskItem);
        }
    });
}

function addTask() {
    const taskInput = document.getElementById("task");
    const dueDateInput = document.getElementById("due-date");
    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    
    if (taskText !== "") {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const newTask = { text: taskText, completed: false, dueDate, date: new Date().toLocaleString() };
        tasks.push(newTask);
        saveTasks(tasks);
        taskInput.value = "";
        dueDateInput.value = "";
        loadTasks();
    }
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.getElementById("add-button").addEventListener("click", addTask);
