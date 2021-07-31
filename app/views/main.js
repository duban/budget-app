const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const btnFetch = document.getElementById("btnFetch");
const span = document.getElementsByClassName("close")[0];

// console.log(raw)


// let data = await fetch("http://localhost:3003/api/budgets")
//     .then((response) => response.blob())
//     .then(data => {
//       return data;
//     })
//     .catch(error => {
//       console.error(error);
//     });
// console.log(data)


btn.onclick = function () {
  expName.value = "";
  expNumber.value = "";
  expenseForm.style.display = "block";
  editForm.style.display = "none";
  modal.style.display = "block";
  budgetform.style.display = "none";
  // expenseForm.style.display = "none";
  // editForm.style.display = "block";
  // modal.style.display = "block";
};
span.onclick = function () {
  modal.style.display = "none";
};
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const amountInput = document.getElementById("number");
const addForm = document.getElementById("addForm");
const budgetAmount = document.getElementById("budgetAmount");
const balanceAmount = document.getElementById("balanceAmount");

const editForm = document.getElementById("editForm");
const saveEdit = document.getElementById("saveEdit");
const editExpValue = document.getElementById("editExpValue");
const editExpName = document.getElementById("editExpName");
const editExpNumber = document.getElementById("editExpNumber");

const expForm = document.getElementById("expForm");
const expensesAmount = document.getElementById("expensesAmount");
const expValue = document.getElementById("expValue");
const displayExpenses = document.getElementById("displayExpenses");
const expenseForm = document.getElementById("expense-form");
const budgetform = document.getElementById("budgetform");

let expName = document.getElementById("expName");
let expNumber = document.getElementById("expNumber");
let id = 0;
let details = [];

async function fetchBudget () {
  try {
    const response = await fetch('http://localhost:3003/api/budgets');
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      alert(message)
    }
    const data = await response.json();
    return data;

  } catch (err) {
    alert(err)
  }
}

async function removeExpense (id) {
  try {
    let response = await fetch('http://localhost:3003/api/expense/' + id, {
      method: 'DELETE'
    });
    console.log(response)
    // const response = await fetch('http://localhost:3003/api/budgets');
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      alert(message)
    }
    // const data = await response.json();
    // alert(data)
    // fetchBudget().then(data => {
    //   // console.log(data)
    //   budgetAmount.innerText = data.budget
    //   balanceAmount.innerText = data.balance;
    //   expensesAmount.innerText = data.expenses.reduce((n, {value}) => n + value, 0)
    //   displayExp(data.expenses)
    // });

  } catch (err) {
    alert(err)
  }
}

async function addBudget (budget) {

  expenseForm.style.display = "none";
  editForm.style.display = "block";
  modal.style.display = "block";
  if (!budget) {
    amountInput.style.border = "1px solid #b80c09";
    amountInput.placeholder = "input can not be empty";
    amountInput.style.color = "#b80c09";
    setTimeout(() => {
      amountInput.style.color = "#495057";
      amountInput.style.border = "1px solid gray";
    }, 3000);
  } else {
    // budgetAmount.innerText = amount;
    // balanceAmount.innerText = amount;
    expenseForm.style.display = "block";
    budgetform.style.display = "none";
    editForm.style.display = "none";
    amountInput.value = "";
  }


  let dataBudget = {budget:parseInt(budget)}
  // console.log('ex',expense)
  try {
    let response = await fetch('http://localhost:3003/api/budget', {
      method: 'POST',
      body: JSON.stringify(dataBudget),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const response = await fetch('http://localhost:3003/api/budgets');
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      alert(message)
    }
    const data = await response.json();
    budgetAmount.innerText = data.data.budget
    balanceAmount.innerText = data.data.balance;
    expensesAmount.innerText = data.data.expenses.reduce((n, {value}) => n + value, 0)
    displayExp(data.data.expenses)
    // editForm.style.display = "none";
    // modal.style.display = "none";
    // expenseForm.style.display = "none";
    // // alert(data)
    // console.log(JSON.stringify(expense))
    // fetchBudget().then(data => {
    //   // console.log(data)
    //   budgetAmount.innerText = data.budget
    //   balanceAmount.innerText = data.balance;
    //   expensesAmount.innerText = data.expenses.reduce((n, {value}) => n + value, 0)
    //   displayExp(data.expenses)
    // });

    // return data;

  } catch (err) {
    alert(err)
  }
}

async function addExpense (title, value) {
  if (!name.length || !number.length) {
  expenseForm.style.display = "none";
  editForm.style.display = "none";
  modal.style.display = "block";
  let expense = {title:title,value:parseInt(value)}
  // console.log('ex',expense)
  try {
    let response = await fetch('http://localhost:3003/api/expense/', {
      method: 'POST',
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const response = await fetch('http://localhost:3003/api/budgets');
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      alert(message)
    }
    const data = await response.json();
    budgetAmount.innerText = data.data.budget
    balanceAmount.innerText = data.data.balance;
    expensesAmount.innerText = data.data.expenses.reduce((n, {value}) => n + value, 0)
    displayExp(data.data.expenses)
    modal.style.display = "none";

    // // alert(data)
    // console.log(JSON.stringify(expense))
    // fetchBudget().then(data => {
    //   // console.log(data)
    //   budgetAmount.innerText = data.budget
    //   balanceAmount.innerText = data.balance;
    //   expensesAmount.innerText = data.expenses.reduce((n, {value}) => n + value, 0)
    //   displayExp(data.expenses)
    // });

    // return data;


  } catch (err) {
    alert(err)
  }
  }
}

async function editExpense (id,title, value) {
  let expense = {title:title,value:parseInt(value)}
  // console.log('ex',expense)
  try {
    // console.log('http://localhost:3003/api/expence/' + id)
    // await fetch('http://localhost:3003/api/edit/expence/' + id, {
    //   method: 'PUT',
    //   body: JSON.stringify(expense)
    // }).then((response) => {
    //   response.json().then((response) => {
    //     console.log(response);
    //   })
    // }).catch(err => {
    //   console.error(err)
    // })
    let response = await fetch('http://localhost:3003/api/edit/expense/' + id, {
      method: 'PUT',
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // const response = await fetch('http://localhost:3003/api/budgets');
    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      alert(message)
    }
    const data = await response.json();
    budgetAmount.innerText = data.data.budget
    balanceAmount.innerText = data.data.balance;
    expensesAmount.innerText = data.data.expenses.reduce((n, {value}) => n + value, 0)
    displayExp(data.data.expenses)
    // // alert(data)
    // console.log(JSON.stringify(expense))
    // fetchBudget().then(data => {
    //   // console.log(data)
    //   budgetAmount.innerText = data.budget
    //   balanceAmount.innerText = data.balance;
    //   expensesAmount.innerText = data.expenses.reduce((n, {value}) => n + value, 0)
    //   displayExp(data.expenses)
    // });

    // return data;

  } catch (err) {
    alert(err)
  }
}

fetchBudget().then(data => {
  console.log(data)
  budgetAmount.innerText = data.budget
  balanceAmount.innerText = data.balance;
  expensesAmount.innerText = data.expenses.reduce((n, {value}) => n + value, 0)
  displayExp(data.expenses)
  if (data.balance === 0 || data.balance === null) {
    budgetform.style.display = "block";
    modal.style.display = "block";

  }
});

function getBudgetAmount(amount) {
  if (!amount) {
    amountInput.style.border = "1px solid #b80c09";
    amountInput.placeholder = "input can not be empty";
    amountInput.style.color = "#b80c09";
    setTimeout(() => {
      amountInput.style.color = "#495057";
      amountInput.style.border = "1px solid gray";
    }, 3000);
  } else {
    budgetAmount.innerText = amount;
    balanceAmount.innerText = amount;
    expenseForm.style.display = "block";
    budgetform.style.display = "none";
    editForm.style.display = "none";
    amountInput.value = "";
  }
}

function addExpenses(name, number) {
  if (!name.length || !number.length) {
    expName.style.border = "1px solid #b80c09";
    expName.placeholder = "input can not be empty";
    expName.style.color = "#b80c09";

    expNumber.style.border = "1px solid #b80c09";
    expNumber.placeholder = "input can not be empty";
    expNumber.style.color = "#b80c09";

    setTimeout(() => {
      expName.style.color = "#495057";
      expName.style.border = "1px solid gray";
      expName.placeholder = "input can not be empty";

      expNumber.placeholder = "input can not be empty";
      expNumber.style.border = "1px solid gray";
      expNumber.style.color = "#495057";
    }, 3000);
  } else {
    const userExp = {
      id: id,
      name: name,
      number: parseInt(number),
    };
    details.push(userExp);
    displayExp(details);
    id++;
    expName.value = "";
    expNumber.value = "";
  }
}

function displayExp(details) {

  expValue.innerHTML = null;
  for (i = 0; i < details.length; i++) {
    // console.log(details[0])
    expValue.innerHTML += `
    <div class="expValue" id="${details[i].id}">
      <div id="expTitleName" class="exp"><p>${details[i].title}</p></div>
      <div id="expValueAmount" class="exp"><p> <span>Rp. </span> ${details[i].value}</p></div>
      <div id="edite_delete">
        <p>
          <button id="${details[i].id}" onclick="editExpDetails(${details[i].id})"> <img src="/image/edit.svg" width="15" alt=""  /></button> 
          <button id="${details[i].id}" onclick="removeExpense(${details[i].id})"><img src="/image/trash.svg" width="15" alt="" /></button>
        </p>
      </div>
    </div>
  `;
  }
  // calcExpenses();
  displayExpenses.style.display = "block";
}

function calcExpenses() {
  let totalExp = 0;
  for (i = 0; i < details.length; i++) {
    totalExp = details[i].value + totalExp;
  }
  expensesAmount.innerText = totalExp;
  updateBalance();
}

function updateBalance() {
  balanceAmount.innerText =
    parseInt(budgetAmount.innerText) - parseInt(expensesAmount.innerText);
}

function delExpenseDetails(id) {
  let index = details.findIndex((item) => item.id === id);
  details.splice(index, 1);
  displayExp(details);
}

function editExpDetails(id) {
  // console.log('kampret')
  // editExpName.value = item.name;
  // editExpNumber.value = item.number;
  // console.log(editExpNumber.value)
  budgetform.style.display = "none";
  expenseForm.style.display = "none";
  editForm.style.display = "block";
  modal.style.display = "block";
  fetchBudget().then(data => {
    // if (data.id == id) {
    data.expenses.findIndex((item) => {
      if (item.id === id) {
        // console.log(item)
        editExpName.value = item.title;
        editExpNumber.value = item.value;
        saveEdit.children[2].id = item.id;
      }
    })
    // budgetAmount.innerText = data.budget
    // balanceAmount.innerText = data.balance;
    // expensesAmount.innerText = data.expenses.reduce((n, {value}) => n + value, 0)
    // displayExp(data.expenses)
  });
  // editExpName.value = 'gula';
  // editExpNumber.value = 10;
  // expenseForm.style.display = "block";
  // budgetform.style.display = "none";
  // editForm.style.display = "block";
  // expenseForm.style.display = "none";
  // budgetform.style.display = "none";
  // editForm.style.display = "block";
  // console.log('itm', details)
  // details.findIndex((item) => {
  //   if (item.id === id) {
  //     console.log('detail')
  //     editExpName.value = item.title;
  //     editExpNumber.value = item.value;
  //     saveEdit.children[2].id = item.id;
  //     modal.style.display = "block";
  //   }
  // });
}

function getExpValue(editExpName, editExpNumber, id) {
  edited = details.findIndex((obj) => obj.id == id);
  details[edited].name = editExpName;
  details[edited].number = parseInt(editExpNumber);
  displayExp(details);
}

function callBudget() {
  budgetform.style.display = "block";
  expenseForm.style.display = "none";
}

saveEdit.addEventListener("submit", (e) => {
  console.log(saveEdit.children[2].id, editExpName.value, editExpNumber.value)
  e.preventDefault();
  editExpense(saveEdit.children[2].id, editExpName.value, editExpNumber.value)
  // getExpValue(editExpName.value, editExpNumber.value, saveEdit.children[2].id);
});

expForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addExpense(expName.value, expNumber.value)
  // addExpenses(expName.value, expNumber.value);
});

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addBudget(amountInput.value)
  // getBudgetAmount(amountInput.value);
});
