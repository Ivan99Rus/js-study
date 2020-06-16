'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?', 50000);
    } while (!isNumber(money));
    appData.budget = money;
  };

const appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
        'Пример 1, пример 2'),
      price,
      quest;
    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      quest = prompt('Введите обязательную статью расход', `Расход ${i}`)
      do {
        price = +prompt('Во сколько это обойдется?', 2500);
      } while (!isNumber(price));

      appData.expenses[quest] = price;
    }
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },

  getTargetMonth: function () {
    appData.period = Math.ceil(appData.mission / appData.budgetMonth);
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      appData.addIncome.push('У вас высокий уровень дохода');
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      appData.addIncome.push('У вас средний уровень дохода');
    } else if (appData.budgetDay < 600) {
      appData.addIncome.push('К сожалению, у вас уровень дохода ниже среднего');
    } else if (appData.budgetDay <= 0) {
      appData.addIncome.push('Что-то пошло не так');
    }
  },
};



start();
appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();
appData.getTargetMonth();

console.log('Расходы за месяц: ', appData.expensesMonth);


appData.period > 0 ? console.log('Цель будет достигнута за : ', appData.period + ' месяцев') :
  console.log('Цель не будет достигнута');


console.log(appData.addIncome);

console.warn('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(`${key} — ${appData[key]}`);
}