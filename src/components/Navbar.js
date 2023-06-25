import React, { useContext } from "react";
import { NavLink,  useNavigate } from "react-router-dom";
import AuthCtx from "./context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/AuthReducer";
import { toggleAction } from "../store/toggleReducer";
import Lottie from "react-lottie-player";
import lottieJson from "../components/pages/NavbarLogo.json";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const ctxData = useContext(AuthCtx);
  const navigate = useNavigate();

  const logOutFunc = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");

    dispatch(authActions.logout());
    // ctxData.getTokenFunc("");
    navigate("/login");
  };
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" class="flex items-center">
          <Lottie
            loop
            animationData={lottieJson}
            play
            className="w-20 h-10"
          />
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Expense Tracker
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => {
            dispatch(toggleAction(true));
          }}
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <NavLink style={({isActive})=>({color:isActive?'blue':''})} to="/">Home</NavLink>

            {!!token && <NavLink to="/dashboard" style={({isActive})=>({color:isActive?'blue':''})}>Dashboard</NavLink>}

            {!!!token && <NavLink to="/signUp" style={({isActive})=>({color:isActive?'blue':''})}>SIGN UP</NavLink>}

            {!!!token && <NavLink to="/login" style={({isActive})=>({color:isActive?'blue':''})}>Sign In</NavLink>}

            {!!token && <NavLink to="/profile"style={({isActive})=>({color:isActive?'blue':''})}>Profile</NavLink>}
            {!!token && (
              <button
                className=" pr-1 pl-1 bg-blue-400 rounded-md relative right-[23px] mr-6"
                onClick={logOutFunc}
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
