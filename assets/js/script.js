var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    // prevents page refresh on submit
    event.preventDefault();
    // create a new list item when the button is clicked
    var listItemEl = document.createElement("li");
    // apply a class name to the newly created li to keep styling
    listItemEl.className = "task-item";
    // add text to the created li
    listItemEl.textContent = "This is a new task.";
    // attach the li to the DOM in browser
    tasksToDoEl.appendChild(listItemEl);
};

// when a form is submitted, append a new list item

formEl.addEventListener("submit", createTaskHandler);

