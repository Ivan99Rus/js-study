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
    //li.key = todo.key;
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
    } else if (this.input.value.trim() === '') {
      alert('Введите задачу');
    }
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  deleteItem(index) {
    //console.log('Удалить элемент с индексом: ', index);
    //console.log('this.todoList[index]: ', this.todoList[index]);
    /*
    найти по ключу и удалть
    рендер
    */
  }

  complatedItem(index) {
    //console.log('Добавить элемент с индексом: ', index);
    /*
    перебопть через foreach todoData и поменять значение на выполненное
    */
  }

  handler(e) {
    let target = e.target;

    const todoItems = document.querySelectorAll('.todo-item');

    todoItems.forEach((el, index) => {
      if (el === target.parentNode.parentNode) {
        if (target.classList.contains('todo-remove')) {
          console.log(this.todoData);
          this.deleteItem(index);
        } else if (target.classList.contains('todo-complete')) {
          this.complatedItem(index);
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