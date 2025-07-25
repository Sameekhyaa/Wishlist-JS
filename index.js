function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


let todoInput = document.querySelector(".input");
let addBtn = document.querySelector(".btn");
let todoInputList = document.querySelector(".todos-container");
let todo= "";


let localData = JSON.parse(localStorage.getItem("todos"));
let todoList = localData || [];
addBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    todo = todoInput.value;
    if (todo.length > 0) {
        todoList.push({
            todo,
            id:uuid(),
            isCompleted:false
        });
        renderTodoList(todoList);
        localStorage.setItem("todos",JSON.stringify(todoList));
        console.log(todoList);
        renderTodoList(todoList);
    }

})

todoInputList.addEventListener("click", (e)=>{
    let key = e.target.dataset.key;
    let delKey = e.target.dataset.todokey;
    console.log(delKey);
    todoList = todoList.map(todo =>
        key === todo.id ? {...todo , isCompleted : !todo.isCompleted} :todo

    )
    console.log(todoList);
    todoList= todoList.filter((todo) => todo.id!== delKey)

    console.log(todoList);

    localStorage.setItem("todos", JSON.stringify(todoList));
    renderTodoList(todoList);
})



function renderTodoList(todoList) {
   todoInputList.innerHTML =todoList.map(
    ({
        todo,
        id,
        isCompleted
    })=>
        `<div class="todo"> 
        <input id="item-${id}" data-key=${id} class="t-checkbox t-pointer" type="checkbox" ${
        isCompleted ? "checked" : ""}>
        <label data-key=${id} class="todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" 
        for="item-${id}"> ${todo} 
        </label> 
        <button class=" button cursor">
        <span data-todokey=${id}  class="del-btn material-icons-outlined">delete</span>
        </button> </div>`
   )
}

renderTodoList(todoList);