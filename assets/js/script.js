var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function() {
    // create a new list item when the button is clicked
    var listItemEl = document.createElement("li");
    // apply a class name to the newly created li to keep styling
    listItemEl.className = "task-item";
    // add text to the created li
    listItemEl.textContent = "This is a new task.";
    // attach the li to the DOM in browser
    tasksToDoEl.appendChild(listItemEl);
}

buttonEl.addEventListener("click", createTaskHandler);

