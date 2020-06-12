"use strict";

let money = +prompt('Ваш месячный доход?'),
  income = 'Инвестиции',
  addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1000000000,
  period = 9;

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log("length of addExpenses: " + addExpenses.length);
console.log("Период равен: " + period + " месяцев");
console.log("Цель заработать: " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(', '));

let expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?');


let getExpensesMonth = function () {
  return amount1 + amount2;
};

let getAccumulatedMonth = function () {
  return money - getExpensesMonth();
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

console.log('getExpensesMonth: ', getExpensesMonth());
console.log('addExpenses: ', addExpenses);
console.log('getTargetMonth: ', getTargetMonth());
console.log('budgetDay: ', budgetDay);
console.log(getStatusIncome());