const account = {
  firstName: 'Asabeneh',
  lastName: 'Yetayeh',
  elements: {
    description: document.querySelector('.description'),
    amount: document.querySelector('.amount'),
    select: document.querySelector('select'),
    button: document.querySelector('button'),
    incomesWrapper: document.querySelector('.incomes-wrapper'),
    expensesWrapper: document.querySelector('.expenses-wrapper'),
    balanceWrapper: document.querySelector('.balance-wrapper'),
    feedback: document.querySelector('.feedback'),
    type: 'income',
  },
  incomes: [
    {
      id: randomId(),
      time: displayDateTime(),
      description: 'Salary',
      amount: 4000,
    },
    {
      id: randomId(),
      time: displayDateTime(),
      description: 'Book Sale',
      amount: 5000,
    },
    {
      id: randomId(),
      time: displayDateTime(),
      description: 'Bonus',
      amount: 5000,
    },
  ],
  expenses: [
    {
      id: randomId(),
      time: displayDateTime(),
      description: 'Transport',
      amount: 150,
    },
    {
      id: randomId(),
      time: displayDateTime(),
      description: 'Food',
      amount: 150,
    },
    {
      id: randomId(),
      time: displayDateTime(),
      description: 'Rent',
      amount: 500,
    },
  ],
  addTransaction: function(description, amount, type = 'income') {
    if (description === '' || amount === '') {
      this.elements.feedback.textContent =
        'Description and amount field is required';
      setTimeout(() => {
        this.elements.feedback.textContent = '';
      }, 2500);
      return;
    }
    if (type === 'income') {
      this.incomes.push({
        id: randomId(),
        time: displayDateTime(),
        description,
        amount,
      });
      localStorage.setItem('incomes', JSON.stringify(this.incomes));
    } else {
      this.expenses.push({
        id: randomId(),
        time: displayDateTime(),
        description,
        amount,
      });
      localStorage.setItem('expenses', JSON.stringify(this.expenses));
    }
  },
  total: function(type) {
    let sum = 0;
    let transactions = type === 'income' ? this.incomes : this.expenses;
    transactions.forEach(transaction => (sum += Number(transaction.amount)));
    return sum;
  },
  calculateBalance: function() {
    let balance = this.total('income') - this.total('expense');
    return balance;
  },
  createContent: function({time, description, amount}) {
    return `<div class="transaction">
            <span>${time}</span>
            <span>${description}</span>
            <span>${amount.toLocaleString()} €</span>
            </div>`;
  },
  showUI: function() {
    let that = this;
    let incomeContent = `<div><span class="title">Incomes</span></div>`;
    let expenseContent = `<div><span class="title">Expenses</span></div>`;
    let balance = this.calculateBalance();
    let balanceConent = `<div>
    <span class="title">Balance</span>
    <p>You have ${balance.toLocaleString()} € in your account</p>
    </div>`;
    let incomes =
      localStorage.getItem('incomes') === null
        ? this.incomes
        : JSON.parse(localStorage.getItem('incomes'));
    let expenses =
      localStorage.getItem('expenses') === null
        ? this.expenses
        : JSON.parse(localStorage.getItem('expenses'));
    incomes.forEach(income => (incomeContent += that.createContent(income)));
    expenses.forEach(
      expense => (expenseContent += that.createContent(expense))
    );
    incomesWrapper.innerHTML = incomeContent;
    expensesWrapper.innerHTML = expenseContent;
    balanceWrapper.innerHTML = balanceConent;
  },
};

let {
  description,
  amount,
  button,
  type,
  select,
  incomesWrapper,
  expensesWrapper,
  balanceWrapper,
} = account.elements;
select.addEventListener('click', e => {
  let index = e.target.options.selectedIndex;
  type = e.target.options[index].value;
});

button.addEventListener('click', () => {
  account.addTransaction(description.value, amount.value, type);
  account.showUI();
});

account.showUI();
