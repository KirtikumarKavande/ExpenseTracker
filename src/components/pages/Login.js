import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert, { SuccessAlert } from "../../Utlities/constant";
import AuthCtx from "../context/AuthContext";
import { authActions } from "../../store/AuthReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const ctxData = useContext(AuthCtx);

  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isError, setIsError] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    e.preventDefault();
    const obj = {
      email,
      password,
    };

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCklomBWJ4kYkGnD5vZ-1cR3ubCbQ1dp7Y",
      {
        method: "POST",
        body: JSON.stringify({ ...obj, returnSecureToken: true }),
        headers: { "Content-Type": "application/json" },
      }
    ).then((res) => {
      setIsLoading(false);
      res.json().then((data) => {
        if (data.idToken) {
          setIsSignIn(true);
          dispatch(authActions.login(data.idToken));
          ctxData.getTokenFunc(data.idToken);
          ctxData.getEmailFunc(data.email)
          localStorage.setItem("token", data.idToken);
          localStorage.setItem("email", data.email);

          navigate("/dashboard");
        } else {
          setIsError(true);
        }
      });
    });
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };
  useEffect(() => {
    setTimeout(() => {
      setIsSignIn(false);
    }, 2000);
  }, [isSignIn]);
  return (
    <>
      {isError && (
        <Alert
          title={"Login Faild"}
          messege={"You Entered Wrong Email or Password"}
        />
      )}
      {isSignIn && (
        <SuccessAlert title={"Sucess!!!"} messege={"Login successful"} />
      )}
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit}
                onFocus={() => {
                  setIsError(false);
                }}
              >
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    ref={emailRef}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    ref={passwordRef}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? "Loading..." : "Login"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Not Having Account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    SignUp here
                  </Link>
                </p>
                <Link
                  to="/forgetPassword"
                  className="mx-auto hover:text-blue-700"
                >
                  Forget Password ?
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
