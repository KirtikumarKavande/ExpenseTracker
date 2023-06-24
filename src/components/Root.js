import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Root = () => {
 const darkTheme=useSelector(state=>state.theme.darkTheme)
 console.log('dark theme',darkTheme)
  return (
    <div>

      <Navbar />
      <div className={`${!darkTheme ? "bg-indigo-200 min-h-screen":"bg-black min-h-screen"}`}>
      {/* <div> */}
  
      <Outlet />
      </div>
    
    </div>
  );
};

export default Root;
