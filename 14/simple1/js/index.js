'use strict';

/*
1) Сделать класс DomElement, который
   содержит свойства
  - selector, 
  - height, 
  - width, 
  - bg, 
  - fontSize
содержит метод, который создает элемент на странице в зависимости от условия:  
- если строка selector начинается с точки, создаем div с классом
- если строка selector  начинается с решетки # то создаем параграф с id
пример:
если передана строка '.block', то функция конструктор создает элемент с class="block"
если передана строка '#best', то функция конструктор создает элемент с id =best"

с помощью cssText задавать стили: 
  - высотой - height,
  - шириной - width, 
  - background - bg
  - размер текста fontSize 
внутрь созданного блока записывать любой текст. Метод записи может быть любым.
2) Создать новый объект на основе класса DomElement
3) Вызвать его метод чтобы получить элемент на странице
*/


function DomElement(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
}

DomElement.prototype.createEl = function () {
  let newElName = this.selector.slice(1),
    newEl;

  if (this.selector[0] === '.') {
    newEl = document.createElement('div');
    newEl.classList.add(newElName);
  } else if (this.selector[0] === '#') {
    newEl = document.createElement('p');
    newEl.id = newElName;
  }

  newEl.textContent = 'Новый элемент';

  newEl.style.height = this.height + 'px';
  newEl.style.width = this.width + 'px';
  newEl.style.backgroundColor = this.bg;
  newEl.style.fontSize = this.fontSize;

  document.body.append(newEl);
};

const domElement = new DomElement('.block', 20, 150, '#eee', 20);
const domElement1 = new DomElement('#best', 30, 120, '#aeaeae', 30);

domElement.createEl();
domElement1.createEl();

console.log(domElement);
console.log(domElement1);