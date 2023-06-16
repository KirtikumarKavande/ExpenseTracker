import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Root = () => {
 const darkTheme=useSelector(state=>state.theme.darkTheme)
  return (
    <div>

      <Navbar />
      <div className={`${darkTheme ? "bg-black min-h-screen": "bg-slate-100 min-h-screen"}`}>
      <Outlet />
      </div>
    
    </div>
  );
};

export default Root;
