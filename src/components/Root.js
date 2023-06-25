import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/AuthReducer";
import { toggleAction } from "../store/toggleReducer";

const Root = () => {
  const isMenuOpen = useSelector((state) => state.toggleMenu.menu);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const darkTheme = useSelector((state) => state.theme.darkTheme);
  console.log("dark theme", darkTheme);
  const logOutFunc = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("avatar");

    dispatch(authActions.logout());
    // ctxData.getTokenFunc("");
    navigate("/login");
  };
  return (
    <div>
      <Navbar />
      {isMenuOpen && (
        <div
         
          className="w-[10rem] h-screen border text-lg font-bold absolute right-0 top-5 shadow-lg bg-white z-30"
        >
          <button
            onClick={() => {
              dispatch(toggleAction(false));
            }}
            className="text-2xl absolute right-0"
          >
            X
          </button>
          <ul className="flex flex-col justify-center items-center space-y-4 my-2">
            <Link to="/">Home</Link>

            {!!token && <Link to="/dashboard">Dashboard</Link>}

            {!!!token && <Link to="/login">Sign In</Link>}

            {!!!token && <Link to="/signUp">SIGN UP</Link>}

            {!!token && <Link to="/profile">Profile</Link>}

            {!!token && (
              <button
                className=" pr-1 pl-1 bg-red-500 rounded-md relative  "
                onClick={logOutFunc}
              >
                Logout
              </button>
            )}
          </ul>
        </div>
      )}
      <div
        className={`${
          !darkTheme ? "bg-indigo-200 min-h-screen" : "bg-black min-h-screen"
        } relative`}
      >
        {/* <div> */}

        <div className="z-10" onFocus={() => {
            dispatch(toggleAction(false));
          }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
