import React from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
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
        <div className="w-[10rem] h-screen border text-lg font-bold absolute right-0 top-5 shadow-lg bg-white z-30" onFocus={() => {
          dispatch(toggleAction(true));
        }}
        onBlur={()=>{dispatch(toggleAction(false));}}>
          <button
            onClick={() => {
              dispatch(toggleAction(false));
            }}
            className="text-2xl absolute right-0"
          >
            X
          </button>
          <ul className="flex flex-col justify-center items-center space-y-4 my-2">
            <NavLink
              style={({ isActive }) => ({ color: isActive ? "blue" : "" })}
              to="/"
            >
              Home
            </NavLink>

            {!!token && (
              <NavLink
                to="/dashboard"
                style={({ isActive }) => ({ color: isActive ? "blue" : "" })}
              >
                Dashboard
              </NavLink>
            )}

            {!!!token && (
              <NavLink
                to="/signUp"
                style={({ isActive }) => ({ color: isActive ? "blue" : "" })}
              >
                SIGN UP
              </NavLink>
            )}

            {!!!token && (
              <NavLink
                to="/login"
                style={({ isActive }) => ({ color: isActive ? "blue" : "" })}
              >
                SIGN IN
              </NavLink>
            )}

            {!!token && (
              <NavLink
                to="/profile"
                style={({ isActive }) => ({ color: isActive ? "blue" : "" })}
              >
                Profile
              </NavLink>
            )}

            {!!token && (
              <button
                className=" pr-1 pl-1 bg-blue-500 rounded-md relative  "
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

        <div
          className="z-10"
          
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Root;
