'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');

let todoData = [];

const render = () => {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  headerInput.value = '';

  todoData.forEach((item) => {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      '</div>';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const todoComplete = li.querySelector('.todo-complete');
    todoComplete.addEventListener('click', () => {
      item.completed = !item.completed;
      render();
    });

    const todoRemove = li.querySelector('.todo-remove');
    todoRemove.addEventListener('click', () => {
      const index = todoData.indexOf(item);
      todoData.splice(index, 1);
      render();
    });
  });
};

todoControl.addEventListener('submit', (e) => {
  e.preventDefault();

  if (headerInput.value.trim() === '') {
    return;
  }

  const newTodo = {
    value: headerInput.value,
    completed: false
  };

  todoData.push(newTodo);

  render();
});

const setStorage = () => {
  localStorage.setItem('arrTodo', JSON.stringify(todoData));
};

const getStorage = () => {
  todoData = JSON.parse(localStorage.getItem('arrTodo'));
  if (todoData === null) {
    todoData = [];
  }
};

window.onbeforeunload = () => {
  setStorage();
};
localStorage.clear();
getStorage();
render();
