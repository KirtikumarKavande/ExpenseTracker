import React, { useEffect } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseShowTable from "./ExpenseShowTable";
import { useState } from "react";

const Layout = () => {
  const [expense, setExpense] = useState([]);

  useEffect(() => {
    fetch(
      "https://expensetracker-auth-3709f-default-rtdb.firebaseio.com/ExpenseData.json"
    ).then((res) => {
      res.json().then((data) => {
        const updatedArray = [];

        for (let key in data) {
          updatedArray.push({
            id: key,
            categories: data[key].categories,
            descriptions: data[key].descriptions,
            moneyRs: data[key].moneyRs,
          });
        }
        setExpense(updatedArray)
      });
    });
  }, []);

  return (
    <div className="relative bg-indigo-200 min-h-screen">
      <span className="flex flex-row-reverse  text-xs   ">
        Your Email is not Verified verify Link
      </span>
      <AddExpenseForm setExpense={setExpense} expense={expense} />
      {expense.length > 0 && <ExpenseShowTable expense={expense} />}
    </div>
  );
};

export default Layout;
