import React, { useCallback, useContext, useEffect } from "react";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseShowTable from "./ExpenseShowTable";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { expenseAction } from "../../../store/ExpenseReducer";
import Modal from "../../../Modal";
import { themeAction } from "../../../store/themeReducer";
import jsPDF from "jspdf";
import "jspdf-autotable";
import AuthCtx from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Layout = () => {
  const activatedStatus = Boolean(localStorage.getItem("premium"));
  const data = useContext(AuthCtx);
  console.log(" email", data);

  const [showEditButton, setShowEditButton] = useState(false);
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const [statusOfPremium, setStatusOfPremium] = useState(activatedStatus);
  const expenseArrayForDownload = useSelector(
    (state) => state.expense.expenseFromDb
  );

  // const[darkTheme,setDarkTheme] =useState(false)

  const [expense, setExpense] = useState([]);
  const [premium, setPremium] = useState(false);
  const [modal, setModal] = useState(false);
  // const dataActivated = (item) => {
  //   setStatusOfPremium(item);
  // };
  // const dataActivated = useCallback((item) => {
  //   setStatusOfPremium(item);
  // }, [statusOfPremium]);

  useEffect(() => {
    fetch(
      `https://expensetracker-auth-3709f-default-rtdb.firebaseio.com/ExpenseData.json?orderBy="email"&equalTo=${JSON.stringify(
        data.email || localStorage.getItem("email")
      )}`
    ).then((res) => {
      res.json().then((data) => {
        console.log("first", data);
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
  }, []);
  console.log(expense);

  dispatch(expenseAction.getExpense(expense));

  useEffect(() => {
    console.log("payload", "useEffect rig");
    if (data.token) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCklomBWJ4kYkGnD5vZ-1cR3ubCbQ1dp7Y",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            idToken: data.token,
          }),
        }
      ).then((res) => {
        res.json().then((payload) => {
          console.log("payload", payload);

          const newObj = {
            name: payload?.users[0]?.displayName,
            imgUrl: payload?.users[0]?.photoUrl,
            email: payload?.users[0]?.email,
            verifiedEmail: payload?.users[0]?.emailVerified,
          };
localStorage.setItem("avatar",payload?.users[0]?.photoUrl)
          data.getProfileInfo(newObj);
        });
      });
    }
  }, []);

  const downloadHandler = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "My Expense Report";
    const headers = [["category", "description", "price"]];

    const data = expenseArrayForDownload.map((elt) => [
      elt.categories,
      elt.descriptions,
      elt.moneyRs,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <div className="relative  min-h-screen">
      <div>
        {!data.profileInfo.verifiedEmail&&(
          <div className="flex flex-row-reverse  text-sm   ">
            <Link className="text-blue-600 space-x-2" to="/profile">Click</Link>Email is not Verified 
          </div>
        )}

        {modal && (
          <Modal setModal={setModal} setStatusOfPremium={setStatusOfPremium} />
        )}

        <AddExpenseForm
          expense={expense}
          setExpense={setExpense}
          setPremium={setPremium}
          showEditButton={showEditButton}
          setShowEditButton={setShowEditButton}
        />
        {expense.length > 0 && (
          <ExpenseShowTable
            setExpense={setExpense}
            expense={expense}
            setShowEditButton={setShowEditButton}
            statusOfPremium={statusOfPremium}
          />
        )}
      </div>
      {premium && (
        <button
          className="p-1 bg-blue-500 ml-2 rounded-md"
          onClick={() => {
            setModal(true);
            setPremium(false);
          }}
        >
          Activate Premium
        </button>
      )}

      {statusOfPremium && (
        <div className=" mx-[20%] md:mx-[30%] lg:mx-[40%]">
          <button
            className="p-1 bg-green-500 rounded-lg mr-5 "
            onClick={() => {
              dispatch(themeAction.themeChange());
            }}
          >
            {darkTheme ? "Dark Theme " : "Light Theme"}
          </button>

          <button
            className="p-1 bg-red-300 text-center rounded-lg w-fit"
            onClick={downloadHandler}
          >
            <img
              src="img/download.png"
              className="m-auto inline-block h-[1rem]"
              alt="download"
            />
            Expenses
          </button>
        </div>
      )}
    </div>
  );
};

export default Layout;
