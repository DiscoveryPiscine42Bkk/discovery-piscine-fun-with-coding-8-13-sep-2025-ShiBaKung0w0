function getTodos() {
    let todos = document.cookie
        .split('; ')
        .find(row => row.startsWith('todos='));
    return todos ? JSON.parse(decodeURIComponent(todos.split('=')[1])) : [];
}

function saveTodos(todos) {
    document.cookie = "todos=" + encodeURIComponent(JSON.stringify(todos)) + ";path=/";
}

function renderTodos() {
    const list = document.getElementById("ft_list");
    list.innerHTML = "";
    let todos = getTodos();
    todos.forEach((todo, index) => {
        let div = document.createElement("div");
        div.textContent = todo;
        div.onclick = function () {
            if (confirm("Do you want to remove this task?")) {
                todos.splice(index, 1);
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
