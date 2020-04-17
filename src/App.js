import React, { useState } from "react";

function App() {
  const [newTransactionName, setNewTransactionName] = useState("");
  const [newTransactionAmount, setNewTransactionAmount] = useState("");
  const [transactionsHistory, setTransactionsHistory] = useState([
    {
      name: "Cash",
      amount: 500,
    },
  ]);

  const income = 2000;
  const expenseTotal = transactionsHistory.reduce((total, { amount }) => {
    return total + Number(amount);
  }, 0);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Your Balance: ${income - expenseTotal}</p>
      <p style={{ color: "green" }}>Income: ${income} </p>
      <p style={{ color: "red" }}>Expenses: ${expenseTotal}</p>
      <p>History:</p>
      <ul>
        {transactionsHistory.map((item, index) => {
          return (
            <li key={index}>
              {item.name} - ${item.amount}
            </li>
          );
        })}
      </ul>
      <p>Add New Transaction:</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTransactionsHistory([
            ...transactionsHistory,
            { name: newTransactionName, amount: newTransactionAmount },
          ]);
          setNewTransactionName("");
          setNewTransactionAmount("");
        }}
      >
        <input
          required
          placeholder="Name"
          value={newTransactionName}
          onChange={(e) => {
            setNewTransactionName(e.target.value);
          }}
        />
        <input
          required
          type="number"
          placeholder="Amount (+ / -)"
          value={newTransactionAmount}
          onChange={(e) => {
            setNewTransactionAmount(e.target.value);
          }}
        />
        <button>Add Transaction</button>
      </form>
    </div>
  );
}

export default App;
