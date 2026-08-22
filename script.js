let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function addTask() {
    const subjectInput = document.getElementById("subject");
    const taskInput = document.getElementById("task");

    const subject = subjectInput.value.trim();
    const taskName = taskInput.value.trim();

    if (subject === "" || taskName === "") {
        alert("Please enter both subject and task!");
        return;
    }

    const newTask = {
        subject: subject,
        name: taskName,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    subjectInput.value = "";
    taskInput.value = "";

    displayTasks();
    updateProgress();
}

function displayTasks() {
    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const taskDiv = document.createElement("div");

        taskDiv.className = "task";

        taskDiv.innerHTML = `
            <div>
                <strong>${task.subject}</strong>
                <p>${task.name}</p>
            </div>

            <div>
                <button onclick="completeTask(${index})">
                  ${task.completed ? "Completed ✅" : "Complete"}
                 </button>

                <button onclick="editTask(${index})">
                 Edit ✏️
                 </button>

                <button onclick="deleteTask(${index})">
                 Delete 🗑️
                 </button>
            </div>
        `;

        taskList.appendChild(taskDiv);
    });
}

function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();
    updateProgress();
}

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();
    updateProgress();
}

function updateProgress() {

    const progressBar = document.getElementById("progressBar");
    const progressText = document.getElementById("progressText");

    if (tasks.length === 0) {
        progressBar.style.width = "0%";
        progressText.textContent = "0% completed";
        return;
    }

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const percentage = Math.round(
        (completedTasks / tasks.length) * 100
    );

    progressBar.style.width = percentage + "%";

    progressText.textContent =
        percentage + "% completed";
}


    function clearAllTasks() {

    if (tasks.length === 0) {
        alert("There are no tasks to clear!");
        return;
    }

    const confirmation = confirm(
        "Are you sure you want to delete all tasks?"
    );

    if (confirmation) {
        tasks = [];

        saveTasks();

        

        displayTasks();
        updateProgress();
    }
}
