import React, { useState } from "react";

function App() {
  const [newTransactionName, setNewTransactionName] = useState("");
  const [newTransactionAmount, setNewTransactionAmount] = useState("");
  const [transactionsHistory, setTransactionsHistory] = useState([
    {
      name: "Cash",
      amount: 500,
      selected: false,
    },
  ]);

  const expenseTotal = transactionsHistory.reduce((total, { amount }) => {
    const a = Number(amount);
    return a < 0 ? total + a : total;
  }, 0);
  const incomeTotal = transactionsHistory.reduce((total, { amount }) => {
    const a = Number(amount);
    return a > 0 ? total + a : total;
  }, 0);

  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Your Balance: ${incomeTotal + expenseTotal}</p>
      <p style={{ color: "green" }}>Income: ${incomeTotal} </p>
      <p style={{ color: "red" }}>Expenses: ${expenseTotal}</p>
      <p>History:</p>
      <ul>
        {transactionsHistory.map((item, index) => {
          return (
            <li key={index}>
              <input
                type="checkbox"
                checked={item.selected}
                onChange={(e) => {
                  const newHistory = [...transactionsHistory];
                  newHistory[index].selected = !newHistory[index].selected;
                  setTransactionsHistory(newHistory);
                }}
              />
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
            {
              name: newTransactionName,
              amount: newTransactionAmount,
              selected: false,
            },
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
        <button
          type="button"
          onClick={(e) => {
            const newHistory = transactionsHistory.filter((item) => {
              return !item.selected;
            });
            setTransactionsHistory(newHistory);
          }}
        >
          Delete Selected
        </button>

        <input
          id="select-all"
          type="checkbox"
          onChange={(e) => {
            console.log(e.target.checked);
            const newHistory = transactionsHistory.map((item, index) => {
              return { ...item, selected: e.target.checked };
            });
            setTransactionsHistory(newHistory);
          }}
        />
        <label htmlFor="select-all">Select All</label>
      </form>
    </div>
  );
}

export default App;
