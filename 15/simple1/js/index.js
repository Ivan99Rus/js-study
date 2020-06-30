'use strict';

const start = document.getElementById('start'),
  cancel = document.getElementById('cancel'),
  incomePlus = document.getElementsByTagName('button')[0],
  expensesPlus = document.getElementsByTagName('button')[1],
  depositCheck = document.querySelector('#deposit-check'),
  additionalIncomeItems = document.querySelectorAll('.additional_income-item'),
  budgetDayValue = document.querySelector('.budget_day-value'),
  budgetMonthValue = document.querySelector('.budget_month-value'),
  expensesMonthValue = document.querySelector('.expenses_month-value'),
  additionalIncomeValue = document.querySelector('.additional_income-value'),
  additionalExpensesValue = document.querySelector('.additional_expenses-value'),
  incomePeriodValue = document.querySelector('.income_period-value'),
  targetMonthValue = document.querySelector('.target_month-value'),
  salaryAmount = document.querySelector('.salary-amount'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  inputsText = document.querySelectorAll('input[type=text]'),
  periodAmount = document.querySelector('.period-amount');
  let expensesItems = document.querySelectorAll('.expenses-items'),
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  expensesAmount = document.querySelector('.expenses-amount'),
  incomeTitle = document.querySelectorAll('.income-title')[1],
  incomeAmount = document.querySelector('.income-amount'),
  incomeItems = document.querySelectorAll('.income-items');

class AppData {
  constructor() {
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
  }

  start() {
    this.budget = +salaryAmount.value;
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();

    start.style.display = 'none';
    cancel.style.display = 'block';

    incomePlus.style.display = 'none';
    expensesPlus.style.display = 'none';

    const blockInputs = () => document.querySelectorAll('input[type=text]').forEach((item) => item.setAttribute("disabled", "true"));
    blockInputs();
  }

  showResult() {
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = this.getTargetMonth();
    incomePeriodValue.value = this.calcPeriod();

    periodSelect.addEventListener('input', () => {
      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = _this.calcPeriod();
    });
  }

  addExpensesBlock() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);

    let cET = cloneExpensesItem.querySelector('.expenses-title'),
        cEA = cloneExpensesItem.querySelector('.expenses-amount');

        cET.value = '';
        cEA.value = '';

    cET.addEventListener('input', () => {
      cET.value = cET.value.replace(/[^а-я\s,.!?]/, '');
    });
        
    cEA.addEventListener('input', () => {
      cEA.value = cEA.value.replace(/[^0-9]/, '');
    });

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  }

  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);

    let cIT = cloneIncomeItem.querySelector('.income-title'),
      cIA = cloneIncomeItem.querySelector('.income-amount');

    cIT.value = '';
    cIA.value = '';

    cIT.addEventListener('input', () => {
      cIT.value = cIT.value.replace(/[^а-я\s,.!?]/, '');
    });

    cIA.addEventListener('input', () => {
      cIA.value = cIA.value.replace(/[^0-9]/, '');
    });


    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  }

  getExpInc() {
    const count = item => {
      const startStr = item.className.split('-')[0],
        itemTitle = item.querySelector(`.${startStr}-title`).value,
        itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = Number(itemAmount);
      }
    };

    expensesItems.forEach(count);
    incomeItems.forEach(count);

    for (const key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }

  getAddExpenses() {
    const _this = this;

    const addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach((item) => {
      item = item.trim();
      if (item !== '') {
        _this.addExpenses.push(item);
      }
    });
  }

  getAddIncome() {
    const _this = this;

    additionalIncomeItems.forEach((item) => {
      const itemValue = item.value.trim();
      if (itemValue !== '') {
        _this.addIncome.push(itemValue);
      }
    });
  }

  getExpensesMonth() {

    for (const key in this.expenses) {
      this.expensesMonth += this.expenses[key];
    }
  }

  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }

  getTargetMonth() {
    return Math.ceil(targetAmount.value / this.budgetMonth);
  }

  calcPeriod() {
    return this.budgetMonth * periodSelect.value;
  }

  getStatusIncome() {
    if (this.budgetDay >= 1200) {
      return 'У вас высокий уровень дохода';
    } else if (this.budgetDay >= 600 && this.budgetDay < 1200) {
      return 'У вас средний уровень дохода';
    } else if (this.budgetDay < 600) {
      return 'К сожалению, у вас уровень дохода ниже среднего';
    } else if (this.budgetDay <= 0) {
      return 'Что-то пошло не так';
    }
  }

  reset() {
    start.disabled = true;
inputsText.forEach(function (item) {
  item.value = '';
  item.value = '';
});

if (incomeItems.length > 1) {
  for (let i = 0; i < incomeItems.length; i++) {
    if (i === 0) {
      continue;
    }
    incomeItems[i].remove();
  }
  incomeItems[0].querySelector('.income-title').value = '';
  incomeItems[0].querySelector('.income-amount').value = '';
  incomePlus.style.display = 'block';
  console.log('incomeItems: ', incomeItems.length);
  incomeItems = document.querySelectorAll('.income-items');
}


if (expensesItems.length > 1) {
  for (let i = 0; i < expensesItems.length; i++) {
    if (i === 0) {
      continue;
    }
    expensesItems[i].remove();
  }
  expensesItems[0].querySelector('.expenses-title').value = '';
  expensesItems[0].querySelector('.expenses-amount').value = '';
  expensesPlus.style.display = 'block';
  expensesItems = document.querySelectorAll('.expenses-items');
  console.log('expensesItems: ', expensesItems.length);
}

    incomePlus.style.display = 'block';
    expensesPlus.style.display = 'block';

    periodSelect.value = 1;
    periodAmount.textContent = '1';

    start.style.display = 'block';
    cancel.style.display = 'none';

    const unBlockInputs = () => document.querySelectorAll('.data input[type=text]').forEach((item) => item.removeAttribute('disabled'));
    unBlockInputs();

    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
  }

  eventListeners() {
    start.disabled = true;

    salaryAmount.addEventListener('input', () => {
      salaryAmount.value === '' ? start.disabled = true : start.disabled = false;
      salaryAmount.value = salaryAmount.value.replace(/[^0-9]/, '');
    });

    salaryAmount.addEventListener('input', () => {
      salaryAmount.value = salaryAmount.value.replace(/[^0-9]/, '');
    });
    
    start.addEventListener('click', appData.start.bind(appData));
    expensesPlus.addEventListener('click', appData.addExpensesBlock);
    incomePlus.addEventListener('click', appData.addIncomeBlock);
    incomeTitle.addEventListener('input', () => {
      incomeTitle.value = incomeTitle.value.replace(/[^а-я\s,.!?]/, '');
    });
    incomeAmount.addEventListener('input', () => {
      incomeAmount.value = incomeAmount.value.replace(/[^0-9]/, '');
    });
    expensesTitle.addEventListener('input', () => {
      expensesTitle.value = expensesTitle.value.replace(/[^а-я\s,.!?]/, '');
    });
    expensesAmount.addEventListener('input', () => {
      expensesAmount.value = expensesAmount.value.replace(/[^0-9]/, '');
    });
    additionalIncomeItems.forEach((item, index) => {
      additionalIncomeItems[index].addEventListener('input', () => {
        additionalIncomeItems[index].value = additionalIncomeItems[index].value.replace(/[^а-я\s,.!?]/, '');
      });
    });
    cancel.addEventListener('click', appData.reset.bind(appData));

    periodSelect.addEventListener('input', () => {
      periodAmount.textContent = periodSelect.value;
      incomePeriodValue.value = this.calcPeriod();
    });
  }
}

const appData = new AppData();
appData.eventListeners();