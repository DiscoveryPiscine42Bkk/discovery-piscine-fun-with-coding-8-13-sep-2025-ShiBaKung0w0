function getTodos() {
    let todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    const list = document.getElementById("ft_list");
    list.innerHTML = "";
    let todos = getTodos();
    todos.forEach((todo) => {
        let div = document.createElement("div");
        div.textContent = todo;
        div.onclick = function () {
            if (confirm("Do you want to remove this task?")) {
                let todos = getTodos();
                todos = todos.filter(t => t !== todo);
                saveTodos(todos);
                renderTodos();
            }
        };
        list.prepend(div);
    });
}

function newTodo() {
    let task = prompt("Enter a new TO DO:");
    if (task && task.trim() !== "") {
        let todos = getTodos();
        todos.unshift(task.trim());
        saveTodos(todos);
        renderTodos();
    }
}

window.onload = renderTodos;
