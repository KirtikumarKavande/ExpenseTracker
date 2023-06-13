import React, { useEffect } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseShowTable from "./ExpenseShowTable";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { expenseAction } from "../../../store/ExpenseReducer";
import Modal from "../../../Modal";


const Layout = () => {
  const dispatch = useDispatch();

  const [expense, setExpense] = useState([]);
  const [premium, setPremium] = useState(false);
  const [modal, setModal] = useState(false);
  const[activatedPremium,setActivatedPremium] = useState(false);

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
        setExpense(updatedArray);
      });
    });
    // console.log('===================',expense)
  }, []);

  dispatch(expenseAction.getExpense(expense));

  return (
 
    <div className="relative bg-indigo-200 min-h-screen">
         <div>
      <span className="flex flex-row-reverse  text-xs   ">
        Your Email is not Verified verify Link
      </span>
      {modal && (
       <Modal setModal={setModal}/>
      )}

      <AddExpenseForm
        setExpense={setExpense}
        expense={expense}
        setPremium={setPremium}
      />
      {expense.length > 0 && (
        <ExpenseShowTable setExpense={setExpense} expense={expense} />
      )}
      </div>
      {premium && (
        <button
          className="p-1 bg-blue-500 ml-2 rounded-md"
          onClick={() => {
            setModal(true);
          }}
        >
          Activate Premium
        </button>
      )}


      {
        activatedPremium && <button>dark Theme</button>
      }
    </div>
  );
};

export default Layout;
