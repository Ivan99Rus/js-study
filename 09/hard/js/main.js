'use strict';

let date,
  days = ['Понеделяник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресеняе'],
  months = ['Января', 'Февраля', 'Март', 'Апреля', 'Май', 'Июня', 'Июля', 'Август', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

let checkAndCreateTwoDigit = (num) => {
  return String(num).length === 1 ? ('0' + num) : num;
};

let declination = (number, titles) => {
  let decCache = [],
    decCases = [2, 0, 1, 1, 1, 2],
    title = [
      ['секунда', 'секунды', 'секунд'],
      ['минута', 'минуты', 'минут'],
      ['час', 'часа', 'часов']
    ];

  titles === 'sec' ? titles = title[0] : titles === 'min' ? titles = title[1] : titles = title[2];

  if (!decCache[number]) {
    decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
  }
  return titles[decCache[number]];
};

let start = () => {
  let date = new Date(),
    day = date.getDate(),
    dayNumber = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hour = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  console.log(`Сегодня ${days[dayNumber - 1]}, ${day} ${months[month]} ${year} года, ${hour} ${declination(hour, 'hour')} ${minutes} ${declination(minutes, 'min')} ${seconds} ${declination(seconds, 'sec')}`);
  console.log(`${checkAndCreateTwoDigit(day)}.${checkAndCreateTwoDigit(month + 1)}.${year} — ${checkAndCreateTwoDigit(hour)}:${checkAndCreateTwoDigit(minutes)}:${checkAndCreateTwoDigit(seconds)}`);
  console.warn('');
};

setInterval(start, 1000);