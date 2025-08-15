const store = 'tasks';

document.addEventListener('DOMContentLoaded', () =>
{
    getTasks();

    const add = document.getElementById('add');
    add.addEventListener('click', AddTask);  
    

    var tasks = document.getElementById('tasks');
    tasks.addEventListener('click',DeleteTask)

})

function getTasks(){
    
    const task_list = JSON.parse(localStorage.getItem(store)) || [];
    var tasks = document.getElementById('tasks');
    tasks.innerHTML = '';
    task_list.forEach(task => {
        
        var html = `<div class = "task-card">
            <p class ="task-description"> ${task.description} </p>
            <p class = "status"> ${task.status} </p>
            <button class = "edit button"> Edit</button>
            <button class = "delete button"> Delete</button>
        </div>`;
        tasks.innerHTML += html;  
    });
}

function AddTask() {
     const store = 'tasks';
        const task_list = JSON.parse(localStorage.getItem(store)) || [];

        const new_task = {
        id : task_list.length,
        description: 'hi',
        status: 'status',
        };
        task_list.push(new_task);
        localStorage.setItem(store,JSON.stringify(task_list));
        
        if(!document.querySelector('.task'))
        {
            var container = document.getElementById('empty');
            container.innerHTML += `<h3> No Tasks Added Yet.</h3>`;
        }
        document.getElementById('empty').style.display = 'none';
        var tasks = document.getElementById('tasks');
        var html = `<div class = "task-card">
            <p class ="task-description"> hi </p>
            <p class = "status"> status </p>
            <button class = "edit button"> Edit</button>
            <button class = "delete button"> Delete</button>
        </div>`;
        tasks.innerHTML += html;
}

function DeleteTask(event){
   const id = event.target.dataset.id;
   const tasks_list = JSON.parse(localStorage.getItem(store)) || [];
   tasks_list.splice(id, 1);
   localStorage.setItem(store, JSON.stringify(tasks_list));
   getTasks();
}