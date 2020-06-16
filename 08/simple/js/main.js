'use strict';

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

// rexExp
let regStringСomma = /^[a-zA-ZА-Яа-я,\s]+$/,
  regString = /^[a-zA-ZА-Яа-я]+$/;

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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {

    if (confirm('Есть ли у вас дополнительный заработок?')) {
      let itemIncome, cashIncome;

      do {
        itemIncome = prompt('Какой у вас есть дополнительный заработок?', 'Таксую');
      } while (!regString.test(itemIncome));

      do {
        cashIncome = prompt('Сколько вы на этом зарабатываете?', '10000');
      } while (!isNumber(cashIncome));

      appData.income[itemIncome] = cashIncome;
    }

    let addExpenses, price, quest;

    do {
      addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
        'Машина, квартира');
    } while (!regStringСomma.test(addExpenses));

    appData.addExpenses = addExpenses.toLowerCase().split(', ');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++) {
      do {
        quest = prompt('Введите обязательную статью расходов', 'Расход'.repeat(i + 1));
      } while (!regString.test(quest));
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
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },

  getStatusIncome: function () {
    if (appData.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (appData.budgetDay >= 600 && appData.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (appData.budgetDay < 600) {
      return 'К сожалению, у вас уровень дохода ниже среднего';
    } else if (appData.budgetDay <= 0) {
      return 'Что-то пошло не так';
    }
  },

  getInfoDeposit: function () {
    if (appData.deposit) {
      do {
        appData.percentDeposit = prompt('Какой годовой процент?', '10');
      } while (!isNumber(appData.percentDeposit));

      do {
        appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      } while (!isNumber(appData.moneyDeposit));
    }
  },

  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ', appData.expensesMonth);

appData.period > 0 ? console.log('Цель будет достигнута за : ', appData.period + ' месяцев') :
  console.log('Цель не будет достигнута');

console.log(appData.getStatusIncome());
appData.getInfoDeposit();

let addExpensesLog = function () {
  let newArr = [];

  appData.addExpenses.forEach((item) => {
    newArr.push(item.replace(item[0], item[0].toUpperCase()));
});
  console.log(newArr.join(', '));
};
addExpensesLog();




console.warn('Наша программа включает в себя данные:');
for (let key in appData) {
  console.log(`${key} — ${appData[key]}`);
}