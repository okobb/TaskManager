const store = "tasks";

document.addEventListener("DOMContentLoaded", () => {
  getTasks();

  const add = document.getElementById("add");
  add.addEventListener("click", AddTaskForm);

  var tasks = document.getElementById("tasks");
  tasks.addEventListener("click", (event) => {
     if (event.target.classList.contains('delete')) {
        const id = event.target.dataset.id;
        DeleteTask(id);}
        });
})

function getTasks() {
  const task_list = JSON.parse(localStorage.getItem(store)) || [];
  var tasks = document.getElementById("tasks");
  tasks.innerHTML = "";
  if (task_list.length === 0) {
    document.getElementById("empty").style.display = "block";
    var container = document.getElementById("empty");
    container.innerHTML = `<h3> No Tasks Added Yet.</h3>`;
  } else {
    document.getElementById("empty").style.display = "none";

    task_list.forEach((task) => {
      var html = `<div class = "task-card">
            <p class ="task-description"> ${task.description} </p>
            <p class = "status"> ${task.status} </p>
            <button class = "edit button"> Edit</button>
            <button class = "delete button"> Delete</button>
        </div>`;
      tasks.innerHTML += html;
    });
  }
}

function AddTask() {

const description_input = document.getElementById('create-task-description');
  const status_select = document.getElementById('create-task-status');
  const description = description_input.value;
  const status = status_select.value;
  const store = "tasks";


  if (description.trim() === "") {
    alert("Please enter a description.");
    return;
  }
  if (status === "") {
    alert("Please select a status.");
    return;
  }
  const task_list = JSON.parse(localStorage.getItem(store)) || [];

  const new_task = {
    id: task_list.length, // Use a reliable ID
    description: description,
    status: status
  };

  task_list.push(new_task);
  localStorage.setItem(store, JSON.stringify(task_list));

  document.getElementById('add').style.display = 'block';
    getTasks();
}

function DeleteTask(id) {
  const tasks_list = JSON.parse(localStorage.getItem(store)) || [];
  tasks_list.splice(id, 1);
  localStorage.setItem(store, JSON.stringify(tasks_list));
  getTasks();
}

function AddTaskForm() {
  var html = `<div class = "create-task" id = "create-task">
        <input type = "text" id="create-task-description">
        <select id ="create-task-status">
            <option value = "" selected disabled> </option>
            <option value = "Pending">Pending</option>
            <option value = "Completed">Completed</option>
        </select>
        <button class = "Cancel button" id = "cancel"> Cancel</button>
        <button class = "confirm button" id = "confirm"> Confirm</button>
    </div>`;
    var tasks = document.getElementById('tasks');
    tasks.innerHTML += html;
    document.getElementById("add").style.display = 'none';

    const cancel = document.getElementById("cancel");
    cancel.addEventListener("click", () => {
        document.getElementById('create-task').remove();
        document.getElementById('add').style.display = 'block';
    });

    const confirm = document.getElementById('confirm');
    confirm.addEventListener("click", AddTask);
}