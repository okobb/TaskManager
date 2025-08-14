document.addEventListener('DOMContentLoaded', () =>
{
    if(!document.querySelector('.task'))
    {
        var container = document.getElementById('empty');
        container.innerHTML += `<h3> No Tasks Added Yet.</h3>`;
    }
    var add = document.getElementById('add');
    add.addEventListener('click', () => 
    {
        document.getElementById('empty').style.display = 'none';
        var tasks = document.getElementById('tasks');
        tasks.innerHTML += `<div class = "task-card">
            <p class ="task-description"> hi </p>
            <p class = "status"> status </p>
            <button class = "edit button"> Edit</button>
            <button class = "delete button"> Delete</button>
        </div>`;
    })
    
})

