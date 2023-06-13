import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ExpenseShowTable = ({ expense, setExpense }) => {

  const data = useSelector((state) => state.expense.expenseFromDb);
  console.log("expense", data);

 

  const deleteHandler = (id) => {
    const updatedArray = expense.filter((obj) => {
      return obj.id !== id;
    });
    setExpense(updatedArray);
    fetch(
      `https://expensetracker-auth-3709f-default-rtdb.firebaseio.com/ExpenseData/${id}.json`,
      {
        method: "DELETE",
      }
    );
  };
  // console.log("expense", expense);
  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-9 m-6">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                price
              </th>
              <th scope="col" className="px-6 py-3">
                Discription
              </th>
              <th scope="col" className="px-6 py-3">
                Edit
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item) => {
              if (item.moneyRs < 1000) {
                return (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    <td class="px-6 py-4">{item?.categories}</td>
                    <td class="px-6 py-4">{item?.moneyRs}</td>

                    <td class="px-6 py-4">{item?.descriptions}</td>
                    <td class="px-6 py-4">
                      <button>Edit</button>
                    </td>
                    <td class="px-6 py-4">
                      <button
                        onClick={() => {
                          deleteHandler(item?.id);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExpenseShowTable;
