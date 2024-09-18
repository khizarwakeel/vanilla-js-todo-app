const TodoFunction = (e) => {
  e.preventDefault();

  const inputText = document.querySelector("#inputText");
  const ulMain = document.querySelector(".ulMain");

  if (inputText.value.trim() !== "") {
    const todo = document.createElement('li');
    todo.className = "listItem mt-2 todos";
    todo.textContent = inputText.value;
    ulMain.appendChild(todo);

    saveTodoToLocalStorage(inputText.value);

    visibilityClearButton();
    inputText.value = "";
  }
};

const saveTodoToLocalStorage = (todo) => {
  let todos = getTodosFromLocalStorage();
  todos.push(todo);
  console.log(todos, "= Add Todos");

  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodosFromLocalStorage = () => {
  let todos = localStorage.getItem("todos");
  console.log(todos);
  if (todos) {
    todos = JSON.parse(todos);
  }
  else {
    todos = []
  }
  return todos;
};

const displayTodos = () => {
  const todos = getTodosFromLocalStorage();
  const ulMain = document.querySelector(".ulMain");

  todos.forEach(todo => {
    const listItem = document.createElement('li');
    listItem.className = "listItem mt-2 todos";
    listItem.textContent = todo;
    ulMain.appendChild(listItem);
  });

  visibilityClearButton();
};

const visibilityClearButton = () => {
  const ulMain = document.querySelector(".ulMain");
  const clearButton = document.querySelector("#clearButton button");

  if (ulMain.children.length > 0) {
    clearButton.style.display = "block";
  } else {
    clearButton.style.display = "none";
  }
};

const clearAllTodos = () => {
  const ulMain = document.querySelector(".ulMain");

  while (ulMain.firstChild) {
    ulMain.removeChild(ulMain.firstChild);
  }

  localStorage.removeItem("todos");

  visibilityClearButton();
};

const formSubmit = document.querySelector("#todoForm");
formSubmit.addEventListener("submit", TodoFunction);

const clearButton = document.querySelector("#clearButton button");
clearButton.addEventListener("click", clearAllTodos);

clearButton.style.display = "none";

window.addEventListener("DOMContentLoaded", displayTodos);