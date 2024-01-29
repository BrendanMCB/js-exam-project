
//Event listener

document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const categoryButtons = document.querySelectorAll(".category-buttons button");

    let tasks = [];

    // Function to add a task to the list and update localStorage
    function addTask(category, taskText) {
        tasks.push({ category, taskText, completed: false });
        updateLocalStorage();
        updateTaskList();
    }

    // Function to show the task list
    function updateTaskList() {
        taskList.innerHTML = "";
        const selectedCategory = getSelectedCategory();

        tasks.forEach((task, index) => {
            if (selectedCategory === "all" || task.category === selectedCategory) {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <span>${task.taskText}</span>
                    <button class="completeButton">✅</button>
                    <button class="deleteButton">🗑️</button>
                `;

                if (task.completed) {
                    listItem.classList.add("completed");
                }

                listItem.querySelector(".completeButton").addEventListener("click", () => {
                    toggleTaskCompletion(index);
                });

                listItem.querySelector(".deleteButton").addEventListener("click", () => {
                    deleteTask(index);
                });

                taskList.appendChild(listItem);
            }
        });
    }

    // Function to toggle task completion
    function toggleTaskCompletion(index) {
        tasks[index].completed = !tasks[index].completed;
        updateLocalStorage();
        updateTaskList();
    }

    // Function to delete a task
    function deleteTask(index) {
        tasks.splice(index, 1);
        updateLocalStorage();
        updateTaskList();
    }

    // Function to get the selected category
    function getSelectedCategory() {
        const selectedButton = document.querySelector(".category-buttons button.active");
        return selectedButton ? selectedButton.id : "all";
    }

    // Function to update localStorage with tasks
    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Event listeners
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        const selectedCategory = getSelectedCategory();
        if (taskText !== "") {
            addTask(selectedCategory, taskText);
            taskInput.value = "";
        }
    });

    categoryButtons.forEach((button) => {
        button.addEventListener("click", () => {
            categoryButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");
            updateTaskList();
        });
    });

    // Initialize the task list from localStorage
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }

    // Initialize the task list
    updateTaskList();
});
