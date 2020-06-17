/*
Восстановить порядок книг.
Заменить картинку заднего фона на другую из папки image
Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
Удалить рекламу со страницы
Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
*/

'use strict';
const bookList = document.querySelectorAll('.book'),
  books = document.querySelector('.books'),
  ads = document.querySelector('.adv');

let sortArr = [];

bookList.forEach((item) => {
  item.querySelector('h2');
  let index = item.querySelector('h2').textContent.split('Книга')[1][1] - 1;
  sortArr[index] = item;
});

sortArr.forEach((i) => {
  books.insertAdjacentElement('beforeend', i);
  if (i === 2) {
    i.querySelector('h2').textContent = 'Книга 3. this и Прототипы Объектов';
  }
});

document.body.style.background = 'url(image/you-dont-know-js.jpg) center no-repeat';

ads.style.display = 'none';


let liSecondList = sortArr[1].querySelectorAll('li');
liSecondList[3].after(liSecondList[6]);
liSecondList[6].after(liSecondList[8]);
liSecondList[9].after(liSecondList[2]);

let liFiveList = sortArr[4].querySelectorAll('li');
liFiveList[1].after(liFiveList[9]);
liFiveList[9].after(liFiveList[3]);
liFiveList[3].after(liFiveList[4]);
liFiveList[8].before(liFiveList[5]);

let liSixList = sortArr[5].querySelectorAll('li'),
newLiSix = document.createElement('li');
newLiSix.textContent = 'Глава 8: За пределами ES6';
liSixList[8].after(newLiSix);
