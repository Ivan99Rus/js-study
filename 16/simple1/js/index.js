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
  periodAmount = document.querySelector('.period-amount'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent');
  let expensesItems = document.querySelectorAll('.expenses-items'),
  incomeTitle = document.querySelectorAll('.income-title')[1],
  incomeAmount = document.querySelector('.income-amount'),
  expensesTitle = document.querySelectorAll('.expenses-title')[1],
  expensesAmount = document.querySelector('.expenses-amount'),
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
    this.getInfoDeposit();
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

    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';

    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }

    expensesItems.forEach(item => {
      expensesTitle = item.querySelector('.expenses-title')
      expensesAmount = item.querySelector('.expenses-amount')

      expensesTitle.addEventListener('input', () => {
        expensesTitle.value = expensesTitle.value.replace(/[^а-я\s,.!?]/, '');
      });

      expensesAmount.addEventListener('input', () => {
        expensesAmount.value = expensesAmount.value.replace(/[^0-9]/, '');
      });
    });
  }

  addIncomeBlock() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';

    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }

    incomeItems.forEach(item => {
      incomeTitle = item.querySelector('.income-title')
      incomeAmount = item.querySelector('.income-amount')

      incomeTitle.addEventListener('input', () => {
        incomeTitle.value = incomeTitle.value.replace(/[^а-я\s,.!?]/, '');
      });

      incomeAmount.addEventListener('input', () => {
        incomeAmount.value = incomeAmount.value.replace(/[^0-9]/, '');
      });
    });
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
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }

  validateDepositPercent() {
    if (+depositPercent.value > 100 || +depositPercent.value < 1 || !(+depositPercent.value)) {
      alert ('Введите корректное значение в поле проценты');
      depositPercent.value = '';
      start.setAttribute('disabled', 'true');
    } else {
      start.removeAttribute('disabled');
    }
  }

  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.value = '';

      depositPercent.addEventListener('change', appData.validateDepositPercent.bind(appData));

      depositPercent.style.display = 'inline-block';  
    } else {
      depositPercent.style.display = 'none';  
      depositPercent.value = valueSelect;
    }
  }

  depositHandler() {
    if (depositCheck.checked){
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {      
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  eventListeners() {
    start.disabled = true;

    salaryAmount.addEventListener('input', () => {
      salaryAmount.value === '' ? start.disabled = true : start.disabled = false;
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

    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  }
}

const appData = new AppData();
appData.eventListeners();