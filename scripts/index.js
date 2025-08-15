const store = "tasks";

document.addEventListener("DOMContentLoaded", () => {
  getTasks();

  const add = document.getElementById("add");
  add.addEventListener("click", AddTaskForm);

  var tasks = document.getElementById("tasks");

  tasks.addEventListener("click", (event) => {
    
    const id = event.target.dataset.id;
    if (event.target.classList.contains('complete')) {
        const task_card = event.target.closest('.task-card');
        if (task_card) {
            markAsComplete(task_card,id);
        }
    }
    else if (event.target.classList.contains("edit")) {
      EditTask(id);
    } else if (event.target.classList.contains("save")) {
      SaveTask(id);
    } else if (event.target.classList.contains("delete")) {
      DeleteTask(id);
    }
  });

  const filter = document.getElementById('filter');
filter.addEventListener('change', () => {
    const selected_status = filter.value;
    const tasks = document.querySelectorAll('.task-card');

    tasks.forEach(card => {
        
        const status_element = card.querySelector('.status');
        const card_status_text = status_element.textContent.trim(); 

        if (selected_status === "All" || card_status_text === selected_status) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
  });
});

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
            const completedClass = task.status === 'Completed' ? 'completed' : '';
            
            
            const editButton = task.status !== 'Completed' 
                ? `<button class="edit button" data-id="${task.id}"> Edit</button>`
                : '';
                
            const completeButton = task.status !== 'Completed'
                ? `<button class="complete button" data-id="${task.id}"> Mark As Complete</button>`
                : '';

            var html = `<div class="task-card ${completedClass}" data-id="${task.id}" data-status="${task.status}">
                <p class="task-description"> ${task.description} </p>
                <p class="status"> ${task.status} </p>
                ${editButton}
                ${completeButton}
                <button class="delete button" data-id="${task.id}"> Delete</button>
            </div>`;
            tasks.innerHTML += html;
        });
    }
}

function AddTask() {
  const description_input = document.getElementById("create-task-description");
  const status_select = document.getElementById("create-task-status");
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
    id: task_list.length, 
    description: description,
    status: status,
  };

  task_list.push(new_task);
  localStorage.setItem(store, JSON.stringify(task_list));

  document.getElementById("add").style.display = "block";
  document.getElementById('filter').value = 'All';
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
  var tasks = document.getElementById("tasks");
  tasks.innerHTML += html;
  document.getElementById("add").style.display = "none";

  const cancel = document.getElementById("cancel");
  cancel.addEventListener("click", () => {
    document.getElementById("create-task").remove();
    document.getElementById("add").style.display = "block";
  });

  const confirm = document.getElementById("confirm");
  confirm.addEventListener("click", AddTask);
}

function SaveTask(id) {
  const edit_input = document.getElementById(`edit-input-${id}`);
  if (!edit_input) {
    return;
  }

  const new_description = edit_input.value;
  const tasks_list = JSON.parse(localStorage.getItem("tasks")) || [];
  const update = tasks_list.find((task) => task.id === parseInt(id));

  if (update) {
    update.description = new_description;
    localStorage.setItem("tasks", JSON.stringify(tasks_list));
    getTasks();
  }
}
function EditTask(id) {

  const task_card = document
    .querySelector(`[data-id="${id}"]`)
    .closest(".task-card");

  if (task_card) {
    const description = task_card.querySelector(".task-description");
    const edit_button = task_card.querySelector(".edit");
    const delete_button = task_card.querySelector(".delete");

   
    const input = document.createElement("input");
    input.type = "text";
    input.value = description.textContent;
    input.id = `edit-input-${id}`;


    description.replaceWith(input);

   
    edit_button.style.display = "none";
    delete_button.textContent = "Save";
    delete_button.classList.add("save");
    delete_button.classList.remove("delete");
  }
}

function markAsComplete(taskDiv,id) {
    
    taskDiv.style.backgroundColor = 'lightgreen';
    const statusElement = taskDiv.querySelector('.status');
    if (statusElement) {
        statusElement.textContent = 'Completed';
    }

    const tasks_list = JSON.parse(localStorage.getItem('tasks')) || [];

   
    tasks_list.forEach(task => {
        if (task.id === parseInt(id)) {
            task.status = 'Completed';
            document.getElementById(`edit-input-${id}`)
        }
    });
       
    localStorage.setItem('tasks', JSON.stringify(tasks_list));
    getTasks();
}


