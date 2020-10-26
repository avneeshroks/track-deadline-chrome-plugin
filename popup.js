const pulginLoaded = () => {
    console.log("checking console logs");
    var addTaskButton = document.getElementById("addTask");
    var removeAllTasksButton = document.getElementById("removeAllTasks");

    updateTasks();

    addTaskButton.addEventListener(
        "click",
        addTaskButtonClickedEvntlistner,
        false
    );

    removeAllTasksButton.addEventListener(
        "click",
        removeAllTasksButtonClickedEvntlistner,
        false
    );
};

const removeAllTasksButtonClickedEvntlistner = () => {
    chrome.storage.sync.clear(function () {
        console.log('All tasks are removed from the chrome storage!!');
        updateTasks();
    });
}

const addTaskButtonClickedEvntlistner = () => {
    // Set the tasks in the storage

    let tasks = [];

    const inputTaskNameElem = document.getElementById('taskName');
    const inputTaskDeadlineElem = document.getElementById('taskDeadline');

    let newTask = {
        name : inputTaskNameElem.value,
        deadline : inputTaskDeadlineElem.value,
    }
    
    chrome.storage.sync.get(['tasks'], function(result) {
        if(
            result.tasks
            && result.tasks.length > 0
        ) {
            tasks = result.tasks;
        }

        tasks.push(newTask);

        chrome.storage.sync.set({ tasks: tasks }, function () {
            console.log('tasks are now set in the chrome storage!!');
        });

        updateTasks();
        document.getElementById("addTaskForm").reset();
    });
};


const updateTasks = () => {
    // Read the tasks from storage.

    var tasksListElem = document.getElementById("tasks");

    chrome.storage.sync.get(['tasks'], function(result) {
        console.log('the tasks read from the chrome storage are: ');
        console.table(result.tasks);

        let takslist = '';

        debugger;

        if(
            result
            && result.tasks
            && result.tasks.length > 0
        ) {
            result.tasks.forEach(task => {
                takslist = takslist + `<li class="taskItem">Task "${task.name}" ends on ${task.deadline}</li>`;
            });
        }

        tasksListElem.innerHTML = takslist;
    });

};

document.addEventListener("DOMContentLoaded", pulginLoaded, false);
