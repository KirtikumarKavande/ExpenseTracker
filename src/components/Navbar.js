import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthCtx from "./context/AuthContext";

const Navbar = () => {
  const ctxData = useContext(AuthCtx);
  const navigate = useNavigate();
  const logOutFunc = () => {
    localStorage.clear();
    ctxData.getTokenFunc("");
    navigate("/login");
  };
  return (
    // <div className="navbar flex justify-between m-2 bg-[#8FC49C] items-center">
    //   <div className="flex md:order-2">
    //     <div className="hamburger cursor-pointer inline-block mx-1 md:hidden">
    //       <div className="h-0.5 w-6 bg-black my-1"></div>
    //       <div className="h-0.5 w-6 bg-black my-1"></div>
    //       <div className="h-0.5 w-6 bg-black my-1"></div>
    //     </div>
    //     {/* <div className="search md:hidden w-8 ml-2">
    //       <img src="img/search.png" />
    //     </div> */}
    //   </div>

    //   <div className="md:order-1 flex">
    //     <div>
    //       <img
    //         className="w-24 h-16 mt-[0.3rem] ml-2"
    //         src="https://plus.unsplash.com/premium_photo-1680721444874-6b52aa31e26c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXhwZW5zZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
    //         alt="Expense logo"
    //       />
    //     </div>
    //     <div className="text-4xl font-bold  ml-3 md:mt-1 md:ml-2 text-white">
    //       Expense Tracker
    //     </div>
    //     <div className="md:flex md:space-x-4 inset-0 -translate-x-96 absolute w-fit md:w-full md:static md:-translate-x-0 text-black font-medium md:items-center md:ml-6">
    //       <Link to="/">Home</Link>
    //       {ctxData.token && <Link to="/dashboard">Dashboard</Link>}

    //       {!!!ctxData.token && <Link to="/signUp">SIGN UP</Link>}
    //       {!!!ctxData.token && <Link to="/login">Sign In</Link>}
    //       {!!ctxData.token && <Link to="/profile">Profile</Link>}

    //       <div>Support</div>
    //     </div>
    //   </div>

    //   <div className="md:order-3 flex items-center">
    //     <div className="search  md:block w-8 mr-2 ">
    //       {ctxData.token && (
    //         <button
    //           className="p-1 bg-red-500 rounded-md relative right-[23px] mr-6"
    //           onClick={logOutFunc}
    //         >
    //           Logout
    //         </button>
    //       )}
    //     </div>
    //   </div>
    // </div>


    
<nav class="bg-white border-gray-200 dark:bg-gray-900">
  <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://flowbite.com/" class="flex items-center">
        <img src="/img/logo.png" class="h-8 mr-3" alt="Flowbite Logo" />
        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Expense Tracker</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
     
        <Link to="/">Home</Link>
       
       
        {ctxData.token && <Link to="/dashboard">Dashboard</Link>}
       
       
        {!!!ctxData.token && <Link to="/signUp">SIGN UP</Link>}
       
       
        {!!!ctxData.token && <Link to="/login">Sign In</Link>}
       
       
        {!!ctxData.token && <Link to="/profile">Profile</Link>}
       
      </ul>
    </div>
  </div>
</nav>

  );
};

export default Navbar;
