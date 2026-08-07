const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");
const descriptionEl = document.getElementById("description");
const amountEl = document.getElementById("amount");

// get transactions if exists else empty array
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let displayedBalance = 0;

transactionFormEl.addEventListener("submit", addTransaction);
updateTransactionList();
updateSummary();

function addTransaction(e) {
    e.preventDefault();

    // get form values
    const description = descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);

    transactions.push(
        // transaction object is a dictionary with id desc and amount
        {
            id: Date.now(),
            description,
            amount
        }
    );

    localStorage.setItem("transactions", JSON.stringify(transactions));
    // 
    // update the transaction to the front end and update the summary (balance, income, expenses)
    updateTransactionList();
    updateSummary();
    
    // clear the form fields
    transactionFormEl.reset();
}

function updateTransactionList() {
    transactionListEl.innerHTML = "";

    const sortedTransactions = [...transactions].reverse() // sort em by most recent first

    sortedTransactions.forEach(transaction => {
        const transactionEl = createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);

    });

}

function createTransactionElement(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction")
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    // todo: update the amount formatting
    li.innerHTML = `
        <span>${transaction.description}</span>
        <span>
        
        ${formatTransactionAmount(transaction.amount)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        </span>


    `;

    return li;

}


function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    updateTransactionList();
    updateSummary();
}

function updateSummary() {
    const amounts = transactions.map(transaction => transaction.amount);
    let income = 0;
    let expense = 0;

    amounts.forEach(amount => {
        if (amount > 0) {
            income += amount;
        } else {
            expense += Math.abs(amount);
        }
    });

    animateBalance(displayedBalance, income - expense);
    displayedBalance = income - expense;

    incomeAmountEl.textContent = "$" + income.toFixed(2);
    expenseAmountEl.textContent = "$" + expense.toFixed(2);

}

function animateBalance(start, end) {
    const duration = 500;
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = start + (end - start) * progress;

        balanceEl.textContent = "$" + value.toFixed(2);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

function add(accumulator, currentValue) {
    return accumulator + currentValue;
}


function formatTransactionAmount(amount) {
    return (amount > 0 ? "+" : "-") + "$" + Math.abs(amount).toFixed(2);
}