// Function to save tasks to localStorage
function saveToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasksarray));
}

// Function to load tasks from localStorage
function loadFromLocalStorage() {
    let storedTasks = localStorage.getItem("tasks");
    tasksarray = storedTasks ? JSON.parse(storedTasks) : [];
}

// Function to render tasks on the page
function fillTasksOnHomePage() {
    document.getElementById("contview").innerHTML = "";
    var index = 0;

    for (let task of tasksarray) {
        document.getElementById("contview").innerHTML += `
            <div class="task2">
                <div class="rightside">
                    <h4>${task.taskname}</h4>
                    <div class="date">
                        <i class="fa-solid fa-calendar-days"></i> ${task.taskdate}
                    </div>
                </div>
                <div class="but">
                    <div class="modify buts" onclick="modify(${index})"><i class="fa-solid fa-pen"></i></div>
                    <div class="delete buts" onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></div>
                    <div class="done buts" onclick="markTaskDone(${index})" style="color: ${task.taskdone ? 'green' : 'inherit'};"><i class="fa-solid fa-thumbs-up"></i></div></div>
            </div>
        `;
        index++;
    }

    // Show delete all button only if there are tasks
    document.getElementById("deleteAll").style.display = tasksarray.length > 0 ? "block" : "none";
}

// Load tasks when the page loads
loadFromLocalStorage();
fillTasksOnHomePage();

// Function to add a new task
document.getElementById("addIcon").addEventListener("click", function () {
    let now = new Date();
    let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let time = hours + ":" + minutes + " " + ampm;

    let taskinput = prompt("Enter your task");
    // if (!taskinput || taskinput.trim() === "") return;
    if(taskinput != ""){
            tasksarray.push({
            taskname: taskinput.trim(),
            taskdate: date + " | " + time,
            taskdone: false
        });
        saveToLocalStorage();
        fillTasksOnHomePage();
    }
    
});

// Function to delete a single task
function deleteTask(index) {
    let isConfirmed = confirm(`You want to delete: "${tasksarray[index].taskname}"?`);
    if (isConfirmed) {
        tasksarray.splice(index, 1);
        saveToLocalStorage();
        fillTasksOnHomePage();
    }
}

// Function to delete all tasks
document.getElementById("deleteAll").addEventListener("click", function () {
    if (tasksarray.length === 0) {
        alert("No tasks to delete!");
        return;
    }

    let taskNames = tasksarray.map(task => task.taskname).join(", ");
    let isConfirmed = confirm(`You want to delete all tasks? \nTasks: ${taskNames}`);

    if (isConfirmed) {
        tasksarray = [];
        saveToLocalStorage();
        fillTasksOnHomePage();
    }
});

// Function to mark a task as done
function markTaskDone(index) {
    let isDone = confirm(`🎉 Task Completed: "${tasksarray[index].taskname}"`);
    if (isDone) {
        tasksarray[index].taskdone = true;
        
        saveToLocalStorage();
        fillTasksOnHomePage();
    }
}

// Function to modify a task
function modify(index) {
    let newTaskName = prompt("Edit selected task:", tasksarray[index].taskname);
    if (newTaskName && newTaskName.trim() !== "") {
        tasksarray[index].taskname = newTaskName.trim();
        saveToLocalStorage();
        fillTasksOnHomePage();
    }
}
