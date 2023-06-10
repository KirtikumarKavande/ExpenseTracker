import React from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseShowTable from "./ExpenseShowTable";
import { useState } from "react";

const Layout = () => {
  const[expense,setExpense]=useState([])
 
  return (
    <div className="relative bg-indigo-200 min-h-screen">
      <span className="flex flex-row-reverse  text-xs   ">
        Your Email is not Verified verify Link
      </span>
      <AddExpenseForm setExpense={setExpense} expense={expense}/>
      {expense.length>0 &&
      <ExpenseShowTable expense={expense}/>
      
      }
    </div>
  );
};

export default Layout;
