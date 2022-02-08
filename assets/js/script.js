var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var completedEditTask = function(taskName, taskType, taskId) {
  // find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;
  alert("Task Updated!");

  // reset the form after updated
  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";
};

var taskFormHandler = function (event) {
  event.preventDefault();

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  // user validation: if either one of the values is false, alert the user to enter a value
  if (!taskNameInput || !taskTypeInput) {
    alert("Please fill out the form before continuing.");
    return false;
  }

  formEl.reset();

  var isEdit = formEl.hasAttribute("data-task-id");

  // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completedEditTask(taskNameInput, taskTypeInput, taskId);
  } else {
    // pack up data as an object
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
  }
};

var createTaskEl = function (taskDataObj) {
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter);

  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl);

  var taskActionsEl = createTaskActions(taskIdCounter);
  listItemEl.appendChild(taskActionsEl);
  // console.log(taskActionsEl);

  tasksToDoEl.appendChild(listItemEl);

  //increase task counter for next unique id
  taskIdCounter++;
};

var createTaskActions = function (taskId) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit buttons
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  // create delete btn
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);

  // create a dropdown menu
  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select parent element
    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
}

var deleteTask = function (taskId) {
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
  //console.log(taskSelected);
};

var editTask = function (taskId) {
  // get task list item element
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  var taskType = taskSelected.querySelector("span.task-type").textContent;

  document.querySelector("input[name='task-name']").value = taskName
  document.querySelector("select[name='task-type']").value = taskType
  document.querySelector("#save-task").textContent = "Save Task";
  formEl.setAttribute("data-task-id", taskId);

}

var taskButtonHandler = function (event) {
  //get target element from event
  var targetEl = event.target;

  // if edit was clicked
  if (targetEl.matches(".edit-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  } else if (targetEl.matches(".delete-btn")) {
    var taskId = targetEl.getAttribute("data-task-id");
    deleteTask(taskId);
  }
};
// when a form is submitted, append a new list item
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);


// left off at 4.3.7
// will get to 5.3