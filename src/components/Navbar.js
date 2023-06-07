import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar flex justify-between m-2 bg-[#8FC49C] items-center">
      <div className="flex md:order-2">
        <div className="hamburger cursor-pointer inline-block mx-1 md:hidden">
          <div className="h-0.5 w-6 bg-black my-1"></div>
          <div className="h-0.5 w-6 bg-black my-1"></div>
          <div className="h-0.5 w-6 bg-black my-1"></div>
        </div>
        <div className="search md:hidden w-8 ml-2"><img src="img/search.png" /></div>
      </div>

      <div className="md:order-1 flex">
        <div>
          <img
            className="w-24 h-16 mt-[0.3rem] ml-2"
            src="https://plus.unsplash.com/premium_photo-1680721444874-6b52aa31e26c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZXhwZW5zZXN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="Expense logo"
          />
        </div>
        <div className="text-4xl font-bold  ml-3 md:mt-1 md:ml-2 text-white">
          Expense Tracker
        </div>
        <div className="md:flex md:space-x-4 inset-0 -translate-x-96 absolute w-fit md:w-full md:static md:-translate-x-0 text-black font-medium md:items-center md:ml-6">
          <Link to='/'>Home</Link>
          <Link to="/signUp">SIGN UP</Link >
          <Link to='/login'>Sign In</Link>
          <Link to='/profile'>Profile</Link>
          <div>Xbox</div>
          <div>Support</div>
        </div>
      </div>

      <div className="md:order-3 flex items-center">
        <div className="search  hidden md:block w-8 mr-2 "><img src="img/search.png" /></div>
      </div>
    </div>
  );
};

export default Navbar;
