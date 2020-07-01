'use strict';

const mainTitle = document.querySelector('.main-title'),
  mainContentTodayValue = document.querySelector('.main-content__today-value'),
  mainContentNowValue = document.querySelector('.main-content__now-value'),
  mainContentYearValue = document.querySelector('.main-content__year-value'),

  date = new Date(),

  days = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
  timeOfDay = {
    morning: {
      hours: [4, 5, 6, 7, 8, 9, 10, 11],
      hello: 'Доброе утро!'
    },
    day: {
      hours: [12, 13, 14, 15],
      hello: 'Добрый день!'
    },
    evening: {
      hours: [16, 17, 18, 19, 20, 21, 22, 23],
      hello: 'Добрый вечер!'
    },
    night: {
      hours: [0, 1, 2, 3],
      hello: 'Доброй ночи!'
    }
  };
let dayTime,
  yearDays = Math.floor(
    (new Date(date.getFullYear() + 1, 0, 1).getTime() - new Date().getTime()) / 1000 / 3600 / 24
  );

function declOfNum(number, titles) {
  let cases = [2, 0, 1, 1, 1, 2];
  return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

for (let key in timeOfDay) {
  dayTime = timeOfDay[key].hours.includes(date.getHours());
  if (dayTime) {
    mainTitle.textContent = timeOfDay[key].hello;
  }
}


mainContentTodayValue.textContent = days[date.getDay()];
mainContentNowValue.textContent = date.toLocaleTimeString('ru');
mainContentYearValue.textContent = yearDays + ' '+ declOfNum(yearDays, ['день', 'дня', 'дней']);