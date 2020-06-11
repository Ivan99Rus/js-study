let money =  1000000000,
 income = 'Инвестиции',
 addExpenses = "Обучение, Коммунальные услуги, Интернет",
 deposit = true,
 mission = 1000000000,
 period = 9;

  console.log("money: " + typeof money);
  console.log("income: " + typeof income);
  console.log("deposit: " + typeof deposit);
  console.log("length of addExpenses: " + addExpenses.length);
  console.log("Период равен: " + period + " месяцев");
  console.log("Цель заработать: " + mission + " долларов");
  console.log(addExpenses.toLowerCase().split(', '));

  let budgetDay = money / 30;
  console.log('budgetDay: ', budgetDay);
