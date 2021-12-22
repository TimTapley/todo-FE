

const getAllTodos = async () => {
    let result = await fetch('http://localhost:3000/todos')
    let todos = await result.json()

    return todos
}

const getCompletedTodos = async () => {
    let result = await fetch('http://localhost:3000/todos/completed')
    let completedTodos = await result.json()
    return completedTodos
}

const getUncompletedTodos = async () => {
    let result = await fetch('http://localhost:3000/todos/uncompleted')
    let uncompletedTodos = await result.json()
    return uncompletedTodos
}

const displayAllTodos = (todos) => {
    let allTodos = ''
    todos.data.forEach((todo) => {
        allTodos += `<p class="todo" data-id="${todo._id}" >${todo.title} ${todo.completed ? 'completed' : ''}</p>`
        allTodos += `<button class="deleteButton" data-id="${todo._id}" >Delete ${todo.deleted ? 'deleted' : ''}</button>`
    })
    document.getElementById('allTodosTitle').innerHTML = allTodos
}

const displayCompletedTodos = (completedTodo) => {
    let completedTodos = ''
    completedTodo.data.forEach((todo) => {
        completedTodos += `<p class="completedTodo" data-id="${todo._id}" >${todo.title} ${todo.uncompleted ? 'uncompleted' : ''}</p>`
        completedTodos += `<button class="uncompletedButton" data-id="${todo._id}" >Mark as Uncompleted ${todo.uncompleted ? 'uncompleted' : ''}</button>`
    })
    document.getElementById('completedTodosTitle').innerHTML = completedTodos
}

const displayUncompletedTodos = (uncompletedTodo) => {
    let uncompletedTodos = ''
    uncompletedTodo.data.forEach((todo) => {
        uncompletedTodos += `<p class="uncompletedTodo" data-id="${todo._id}" >${todo.title} ${todo.completed ? 'completed' : ''}</p>`
        uncompletedTodos += `<button class="completedButton" data-id="${todo._id}" >Mark as Completed ${todo.completed ? 'completed' : ''}</button>`
    })
    document.getElementById('uncompletedTodosTitle').innerHTML = uncompletedTodos
}

const addToDb = async (todo) => {
    let res = await fetch('http://localhost:3000/todos', {
        method: "POST",
        body: JSON.stringify({title: todo}),
        headers: {
            "Content-Type": "application/json"
        }
    })
    buildPage()
}

const markTodoAsCompleted = async (id) => {
    let result = await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        }
    })
    buildPage()
}
const markTodoAsUncompleted = async (id) => {
    let result = await fetch(`http://localhost:3000/todos/${id}/mark-as-uncompleted`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        }
    })
    buildPage()
}

const deleteTodo = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    buildPage()
}
const addUncompletedEventListeners = () => {
    let uncompleteElems = document.querySelectorAll('.uncompletedButton')
    uncompleteElems.forEach((uncompleteButton) => {
        uncompleteButton.addEventListener('click', (e) => {
            markTodoAsUncompleted(e.target.dataset.id)
        })
    })
}

const addCompletedEventListeners = () => {
    let completeElems = document.querySelectorAll('.completedButton')
    completeElems.forEach((completeButton) => {
        completeButton.addEventListener('click', (e) => {
            markTodoAsCompleted(e.target.dataset.id)
        })
    })
}

const addDeleteEventListeners = () => {
    let deleteElems = document.querySelectorAll('.deleteButton')
    deleteElems.forEach((deleteButton) => {
        deleteButton.addEventListener('click', (e) => {
            deleteTodo(e.target.dataset.id)
        })
    })
}

const buildPage = async () => {
    let todos = await getAllTodos()
    displayAllTodos(todos)
    let completedTodos = await getCompletedTodos()
    displayCompletedTodos(completedTodos)
    let uncompletedTodos = await getUncompletedTodos()
    displayUncompletedTodos(uncompletedTodos)
    addUncompletedEventListeners()
    addCompletedEventListeners()
    addDeleteEventListeners()
}

buildPage()

document.getElementById('addButton').addEventListener('click', (e) => {
    let input = document.getElementById('addText')
    if(input.value.length !== 0)
    addToDb(input.value)
    document.getElementById("addText").value = "";
})




