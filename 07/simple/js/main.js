'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  start = function () {
    do {
      money = +prompt('Ваш месячный доход?', 50000);
    } while (!isNumber(money));
  };
start();

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
      //console.log('appData.expenses: ', appData.expenses);
      //console.log(key);
      //appData.expensesMonth += (appData.expenses)[key];
      //console.log('appData.expenses[key]: ', (appData.expenses)[key]);
    }
    return appData.expensesMonth;
  },

  getBudget: function () {
    appData.budgetMonth = money - appData.getExpensesMonth();
    appData.budgetDay = appData.getBudget() / 30;
  },

  getTargetMonth: function () {
    appData.period = Math.ceil(appData.mission / appData.getBudget());
    //return Math.ceil(appData.mission / appData.getBudget());
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      appData.income = 'У вас высокий уровень дохода';
      //return ('У вас высокий уровень дохода');
    }
    if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      appData.income = 'У вас средний уровень дохода';
      //return ('У вас средний уровень дохода');
    }
    if (appData.budgetDay < 600) {
      appData.income = 'К сожалению, у вас уровень дохода ниже среднего';
      //return ('К сожалению, у вас уровень дохода ниже среднего');
    }
    if (appData.budgetDay <= 0) {
      appData.income = 'Что-то пошло не так';
      //return ('Что-то пошло не так');
    }
  },
};
appData.asking();

appData.getTargetMonth() > 0 ? console.log('Цель будет достигнута за : ', appData.getTargetMonth() + ' месяцев') :
  console.log('Цель не будет достигнута');

console.log('Расходы за месяц', appData.budgetMonth);
console.log("Цель будет достигнута за: " + appData.period + " месяцев");
console.log(appData.income);

console.warn('Наша программа включает в себя данные:');
for (let key in appData) {
  //console.log(key);
}