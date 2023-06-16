import React from "react";
import { useState } from "react";
import { useRef } from "react";
import Alert, { SuccessAlert } from "../../Utlities/constant";
import { useEffect } from "react";
import {Link} from 'react-router-dom'

const ForgetPassword = () => {
  const [loading, isSetLOading] = useState(false);
  const [success, setSuccess] = useState(false);
  const[alert,setAlert]=useState(false);
  const emailRef = useRef();
  const handleSubmit = (e) => {
    isSetLOading(true);
    e.preventDefault();
    const email = emailRef.current.value;
try{
    fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCklomBWJ4kYkGnD5vZ-1cR3ubCbQ1dp7Y",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            requestType: "PASSWORD_RESET",
          }),
        }
      ).then((res) => {
        isSetLOading(false);

        if(res.ok){
            setSuccess(true);
            res.json().then((data) => {
            });
        }else{
            setAlert(true)
        }
       
      });
} catch{
    console.log("err")
}
   
    emailRef.current.value = "";
  };
  useEffect(() => {
   const id= setTimeout(() => {
      setSuccess(false);
      setAlert(false);
    }, 3000);
    return ()=>clearTimeout(id)
  }, [success,alert]);
  return (
    <div className="container mx-auto relative">

      {success && (
        <SuccessAlert
          title="Link sent"
          messege="email reset link sent succesfully"
        />
      )}
        {alert &&
        <Alert title="Alert" messege="Email Not Found Please Signup "/>
        }   

      <div className="flex justify-center md:items-center h-screen px-6 top-0 left-0 z-10">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex">
          <div className="w-full h-full bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
            <img src="https://images.unsplash.com/photo-1634224143538-ce0221abf732?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Rm9yZ2V0JTIwUGFzc3dvcmR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60" />
          </div>

          <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
            <div className="px-8 mb-4 text-center">
              <h3 className="pt-4 mb-2 text-2xl">Forgot Your Password?</h3>
              <p className="mb-4 text-sm text-gray-700">
                We get it, stuff happens. Just enter your email address below
                and we'll send you a link to reset your password!
              </p>
            </div>
            <form
              className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="email"
                >
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Enter Email Address..."
                  ref={emailRef}
                />
              </div>
              <div className="mb-6 text-center">
                <button
                  className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {loading ? "Loading..." : "Reset Password"}
                </button>
              </div>
              <hr className="mb-6 border-t" />
              <div className="text-center">
                <Link to="/signUp"
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              
                >
                  Create an Account!
                </Link>
              </div>
              <div className="text-center">
                <Link
                to='/login'
                  className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
              
                >
                  Already have an account? Login!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
