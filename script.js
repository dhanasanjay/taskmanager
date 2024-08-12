document.getElementById('task-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    if (title === '') {
        alert('Please enter a task title');
        return;
    }

    let task = {
        title: title,
        description: description,
        status: 'pending'
    };

    saveTask(task);
    document.getElementById('task-form').reset();
});

function saveTask(task) {
    fetch('save_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(response => response.json())
      .then(data => {
          console.log(data);
          addTaskToTable(data);
      })
      .catch(error => console.error('Error:', error));
}

function addTaskToTable(task) {
    let taskList = document.getElementById('task-list');
    let row = document.createElement('tr');

    row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.status}</td>
        <td class="actions">
            <button class="edit" onclick="editTask(${task.id})">
                <i class="fas fa-edit"></i> Edit
            </button>
            <button class="complete" onclick="completeTask(${task.id})">
                <i class="fas fa-check"></i> Complete
            </button>
            <button class="delete" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash-alt"></i> Delete
            </button>
        </td>
    `;

    taskList.appendChild(row);
}


function displayTasks() {
    fetch('get_tasks.php')
        .then(response => response.json())
        .then(tasks => {
            let taskList = document.getElementById('task-list');
            taskList.innerHTML = ''; 
            tasks.forEach(task => {
                addTaskToTable(task);
            });
        })
        .catch(error => console.error('Error fetching tasks:', error));
}

function editTask(id) {
    let newTitle = prompt("Enter new title:");
    let newDescription = prompt("Enter new description:");

    if (newTitle && newDescription) {
        fetch('edit_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id, title: newTitle, description: newDescription })
        }).then(response => response.json())
          .then(data => displayTasks())
          .catch(error => console.error('Error editing task:', error));
    }
}

function completeTask(id) {
    fetch('complete_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    }).then(response => response.json())
      .then(data => displayTasks())
      .catch(error => console.error('Error completing task:', error));
}

function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
        fetch('delete_task.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        }).then(response => response.json())
          .then(data => displayTasks())
          .catch(error => console.error('Error deleting task:', error));
    }
}

displayTasks();
