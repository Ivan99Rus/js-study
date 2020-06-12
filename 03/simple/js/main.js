let money = 1000000000,
  income = 'Инвестиции',
  addExpenses = "Обучение, Коммунальные услуги, Интернет",
  deposit = true,
  mission = 1000000000,
  period = 9;

console.log("money: " + typeof money);
console.log("income: " + typeof income);
console.log("deposit: " + typeof deposit);
console.log("Период равен: " + period + " месяцев");
console.log("Цель заработать: " + mission + " долларов");
console.log(addExpenses.toLowerCase().split(', '));


money = prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?'),
  amount1 = +prompt('Во сколько это обойдется?'),
  expenses2 = prompt('Введите обязательную статью расходов?'),
  amount2 = +prompt('Во сколько это обойдется?'),
  budgetMonth = amount1 + amount2;
  console.log('Бюджет на месяц: ' + budgetMonth);
  console.log('Цель будет достигнута за ' + Math.ceil( mission / budgetMonth ) + ' месяцев');

let budgetDay = budgetMonth / 30;
console.log('Бюджет на день: ' + Math.floor(budgetDay));

if (budgetDay >= 1200) {
  console.log('У вас высокий уровень дохода');
}
if (budgetDay >= 600 && budgetDay < 1200) {
  console.log('У вас средний уровень дохода');
}
if (budgetDay < 600) {
  console.log('К сожалению, у вас уровень дохода ниже среднего');
}
if (budgetDay <= 0) {
  console.log('Что-то пошло не так');
}