"use strict";

let lang = prompt('Введите язык: ru, либо en');

if (lang === 'ru') {
  console.log('Понедельник\nВторник\nСреда\nЧетверг\nПятница\nСуббота\nВоскресенье');
} else if (lang === 'en') {
  console.log('monday\ntuesday\nwednesday\nthursday\nfriday\nsaturday\nsunday');
} else {
  console.log('Упс! Что-то пошло не так :(');
}

switch (lang) {
  case 'ru':
    console.log('Понедельник\nВторник\nСреда\nЧетверг\nПятница\nСуббота\nВоскресенье');
    break;
  case 'en':
    console.log('monday\ntuesday\nwednesday\nthursday\nfriday\nsaturday\nsunday');
    break;
  default:
    console.log('Упс! Что-то пошло не так :(');
    break;
}

let answers = [{
    arrLang: 'ru', days: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
  },
  {
    arrLang: 'en', days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
  }
];

let answersResArr = answers.filter(item => item.arrLang === lang);
let resTotal  = answersResArr[0].days;

console.log(resTotal.join('\n'));


// part 2
let namePerson = prompt('Введите имя');
namePerson === 'Артем' ? console.log('директор') : 
namePerson === 'Максим' ? console.log('преподаватель') : console.log('студент');
