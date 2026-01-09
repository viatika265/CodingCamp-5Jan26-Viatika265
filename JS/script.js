let todos = [];

const todoForm = document.getElementById('todo-form');
const cardList = document.getElementById('card-list');
const filterButtons = document.querySelectorAll('.filter button');
const deleteAllBtn = document.getElementById('delete-all');

todoForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addTodo();
});

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        renderTodos(filter);
    });
});

deleteAllBtn.addEventListener('click', () => {
  todos = [];
  renderTodos('All');
  updateProgress();
});


// Menambahkan task
function addTodo() {
    const todoInput = document.getElementById('new-task-input').value;
    const todoDate = document.getElementById('date').value;
    const todoPriority = document.getElementById('priority').value;

    if (todoInput === '' || todoDate === '' || todoPriority === '') {
        alert('Please fill in all fields.');
        return;
    }

    todos.push({
        text: todoInput,
        date: todoDate,
        priority: todoPriority,
        completed: false
    });
    
    renderTodos('All');  
    clearForm();         
    updateProgress();    
}

// Filter
function renderTodos(filter = 'All') {
    cardList.innerHTML = '';

    let filteredTodos = todos;
    if (filter === 'Active') filteredTodos = todos.filter(todo => !todo.completed);
    if (filter === 'Completed') filteredTodos = todos.filter(todo => todo.completed);

    filteredTodos.forEach(todo => {
        const index = todos.indexOf(todo);
        const li = document.createElement('li');
        li.className = 'todo-card';
        li.innerHTML = `
            <span class="todo-text ${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <span class="todo-date">${todo.date}</span>
            <span class="todo-priority ${todo.priority.toLowerCase()}">${todo.priority}</span>
            <button onclick="completeTodo(${index})">✔️</button>
            <button onclick="deleteTodo(${index})">Delete</button>

        `;
        cardList.appendChild(li);
    });

}

// Menghapus task
function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos('All');
    updateProgress();
}

// Toggle complete
function completeTodo(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos('All');
    updateProgress();
}

// Mengosongkan form input
function clearForm() {
    document.getElementById('new-task-input').value = '';
    document.getElementById('date').value = '';
    document.getElementById('priority').value = '';
}

// Update progress bar
function updateProgress() {
    const progressBarFill = document.getElementById('progress-bar-fill');
    const progressText = document.getElementById('progress-text');

    const totalTodos = todos.length;
    const completedTodos = todos.filter(todo => todo.completed).length;
    const progressPercent = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

    if (progressPercent < 50) progressBarFill.style.backgroundColor = '#facc15'; 
    else if (progressPercent < 100) progressBarFill.style.backgroundColor = '#4ade80'; 
    else progressBarFill.style.backgroundColor = '#22c55e'; 

    progressBarFill.style.width = progressPercent + '%';
    progressText.textContent = progressPercent + '% Completed';
}
