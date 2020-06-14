"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = 'Инвестиции',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1000000000,
  period = 9;

let start = function () {
  do {
    money = +prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

start();

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log("Период равен: " + period + " месяцев");
console.log("Цель заработать: " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(', '));

let expenses = [];

let getExpensesMonth = function () {
  let sum = 0,
    price;

  for (let i = 0; i < 2; i++) {

    expenses[i] = prompt('Введите обязательную статью расходов?');

    do {
      price = +prompt('Во сколько это обойдется?');
    } while (!isNumber(price));

    sum += price;
  }

  console.log('expenses: ', expenses);
  return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function () {
  return money - expensesAmount;
};

let accumulatedMonth = getAccumulatedMonth();

let getTargetMonth = function () {
  return Math.ceil(mission / accumulatedMonth);
};

let budgetDay = accumulatedMonth / 30;

let getStatusIncome = function () {
  if (budgetDay >= 1200) {
    return ('У вас высокий уровень дохода');
  }
  if (budgetDay >= 600 && budgetDay < 1200) {
    return ('У вас средний уровень дохода');
  }
  if (budgetDay < 600) {
    return ('К сожалению, у вас уровень дохода ниже среднего');
  }
  if (budgetDay <= 0) {
    return ('Что-то пошло не так');
  }
};

console.log('expensesAmount: ', expensesAmount);
console.log('addExpenses: ', addExpenses);

getTargetMonth() > 0 ? console.log('Цель будет достигнута за : ', getTargetMonth() + ' месяцев') :
  console.log('Цель не будет достигнута');

console.log('budgetDay: ', budgetDay);
console.log(getStatusIncome());