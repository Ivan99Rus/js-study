'use strict';

let week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
  day = Number(new Date().getDay() - 1);

week.forEach((item, index, arr) => {
  if (index === day && (index === 5 || index === 6)) {
    document.write(`<p><b><i>${item}</i></b></p>`);
  } else if (index === day) {
    document.write(`<p><b>${item}</b></p>`);
  } else if (index === 5 || index === 6) {
    document.write(`<p><i>${item}</i></p>`);
  } else {
    document.write(`<p>${item}</p>`);
  }
});