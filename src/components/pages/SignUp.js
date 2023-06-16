import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Alert, { SuccessAlert } from "../../Utlities/constant";

const SignUp = () => {
  const emailRef = useRef();
  const passRef = useRef();
  const confirmPassRef = useRef();
  const [isError, setIsError] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const conFirm_Password = confirmPassRef.current.value;

    if (password === conFirm_Password) {
      const obj = {
        email,
        password,
      };
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCklomBWJ4kYkGnD5vZ-1cR3ubCbQ1dp7Y",
        {
          method: "POST",
          body: JSON.stringify({ ...obj, returnSecureToken: true }),
          headers: { "Content-Type": "application/json" },
        }
      ).then((res) => {
        setIsLoading(false);
        res.json().then((data) => {
          if (data.idToken) {
            setIsSignUp(true);
          }
        });
      });

    } else {
      setIsError(true);
    }

    emailRef.current.value = "";
    passRef.current.value = "";
    confirmPassRef.current.value = "";
  };
  useEffect(() => {
    setTimeout(() => {
      setIsSignUp(false);
    }, 2000);
  }, [isSignUp]);

  return (
    <>
      {isError && (
        <Alert
          title={"Alert Try Again"}
          messege={"Both Password should Match "}
        />
      )}
      {isSignUp && (
        <SuccessAlert
          title={"Success!!!"}
          messege={"Sign Up Successful! Now you can login  "}
        />
      )}

      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
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
                    required=""
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
                    required=""
                    ref={passRef}
                  />
                </div>
                <div>
                  <label
                    for="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                    ref={confirmPassRef}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isLoading ? "Loading..." : "Create an account"}
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
