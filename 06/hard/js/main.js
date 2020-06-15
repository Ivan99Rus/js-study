"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let createBotNumber = () => {
  return Math.floor(Math.random() * 100) + 1;
};

let startGame = () => {
  let botNumber = createBotNumber(),
    counter = 10;

  console.log('botNumber: ', botNumber);


  let game = (bot) => {
    let user = +prompt('Угадай число от 1 до 100');

    if (user === null) {
      alert('Возвращайтесь скорее!');
      return;
    } else if (user === '') {
      alert('Вы ничего не ввели!\nПопробуйте еще раз');
      game(bot);
    } else if (user > bot) {
      if (counter - 1 === 0) {
        attemptEnded();
      } else {
        alert(`Загаданное число меньше, осталось попыток ${--counter}`);
        game(bot);
      }
    } else if (user < bot) {
      if (counter - 1 === 0) {
        attemptEnded();
      } else {
        alert(`Загаданное число больше, осталось попыток ${--counter}`);
        game(bot);
      }
    } else if (!isNumber(user)) {
      alert('Введи число!');
      game(bot);
    } else if (user === bot) {
      let res = confirm('Поздравляю, Вы угадали!!!\nХотели бы сыграть еще?');
      res ? startGame() : alert('Возвращайтесь скорее!');
    }
  };
  game(botNumber);
};

let attemptEnded = () => {
  let res = confirm('Попытки закончились, хотите сыграть еще?');
  res ? startGame() : alert('Возвращайтесь скорее!');
};

startGame();