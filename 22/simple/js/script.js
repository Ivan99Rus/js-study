'use strict';

class Todo {
  constructor(form, input, todoList, todoComplated) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoComplated = document.querySelector(todoComplated);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
  }

  render() {
    this.todoList.textContent = '';
    this.todoComplated.textContent = '';
    this.todoData.forEach(this.createItem, this);
    this.addToStorage();
  }

  createItem(todo) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.insertAdjacentHTML('beforeend', `
      <span class = "text-todo">${todo.value}</span> 
      <div class = "todo-buttons">
        <button class = "todo-edit"></button> 
        <button class = "todo-remove"></button> 
        <button class = "todo-complete"></button> 
      </div>
    `);

    if (todo.complated) {
      this.todoComplated.append(li);
    } else {
      this.todoList.append(li);
    }
  }

  addTodo(e) {
    e.preventDefault();

    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        complated: false,
        key: this.generateKey()
      };
      this.todoData.set(newTodo.key, newTodo);
      this.render();
      this.input.value = '';
    } else if (this.input.value.trim() === '') {
      alert('Введите задачу');
    } 
      
    
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(key) {
    this.todoData.delete(key);
    this.render();
  }

  complatedItem(key) {
    
    this.todoData.forEach((el, i) => {
      if (key === i) {
        console.log('key: ', key);
        console.log('i: ', i);
        console.log(el.complated = !el.complated);
      }
    });
    this.render();
  }

  handler(e) {
    let target = e.target;
    console.log('target: ', target);

    let keys = [];
    console.log(this.todoData);
    this.todoData.forEach(function (value, key) {
      keys.push(key);
    });

    let todoItems = document.querySelectorAll('.todo-item'); 

    todoItems.forEach((el, index) => {
      if (el === target.parentNode.parentNode) {
        if (target.classList.contains('todo-remove')) {
          this.deleteItem(keys[index]);
        } else if (target.classList.contains('todo-complete')) {
          this.complatedItem(keys[index]);
        }
      }
    });

  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.todoList.addEventListener('click', this.handler.bind(this));
    this.render();
  }

}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();