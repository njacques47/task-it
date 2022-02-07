var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function(event) {
    // prevents page refresh on submit
    event.preventDefault();

    // looks for an element called 'input' with an [attribute] value of 'task-name'; sq bracets select the attribute
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    console.dir(taskNameInput);
   
    // create a new list item when the button is clicked
    var listItemEl = document.createElement("li");
    // apply a class name to the newly created li to keep styling
    listItemEl.className = "task-item";

    // create a div to hold task info then assign the div a class
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    // attach the newly created div to the list item
    listItemEl.appendChild(taskInfoEl);
    
    // attach the list item to the unordered list parent item
    tasksToDoEl.appendChild(listItemEl);
};

// when a form is submitted, append a new list item

formEl.addEventListener("submit", createTaskHandler);

