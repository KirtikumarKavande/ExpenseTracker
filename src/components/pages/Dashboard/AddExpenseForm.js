import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const AddExpenseForm = ({ setExpense, expense,setPremium }) => {



  const email = localStorage.getItem("email");

  const money_Spend = useRef();
  const description = useRef();
  const category = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const moneyRs = money_Spend.current.value;
    const descriptions = description.current.value;
    const categories = category.current.value;
if(moneyRs>10000)
{
  setPremium(true)
}
    const obj = {
      moneyRs,
      descriptions,
      categories,
    };
   
    fetch(
      "https://expensetracker-auth-3709f-default-rtdb.firebaseio.com/ExpenseData.json",
      {
        method: "POST",
        body: JSON.stringify({ ...obj, email }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      res.json().then((data) => {
        console.log(data);
      });
    }); 
    
    setExpense([...expense, obj]);
   
    console.log("expense Added", obj);
    money_Spend.current.value = "";
    description.current.value = "";
    category.current.value = "";

  };

  return (
    <div className="  flex justify-center ">
      <form
        className="w-full max-w-xs bg-white flex flex-col py-5 px-8 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <label className="text-gray-700 font-bold py-2" for="">
          Money Spend
        </label>
        <input
          className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
          type="Number"
          placeholder="Rs"
          ref={money_Spend}
        />
        <label className="text-gray-700 font-bold py-2" for="">
          Description
        </label>
        <input
          className="text-gray-700 shadow border rounded border-gray-300 mb-3 py-1 px-3 focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="short Description"
          ref={description}
        />

        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Category
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ref={category}
        >
          <option selected>Choose a Category</option>
          <option value="Food">Food</option>
          <option value="Fuel">Fuel</option>
          <option value="Movie">Movie</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>

        <div className="flex justify-between items-center my-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
