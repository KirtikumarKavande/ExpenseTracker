import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Root from "./components/Root";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import Layout from "./components/pages/Dashboard/Layout";
import Profile from "./components/pages/Profile/Profile";
import ForgetPassword from "./components/pages/ForgetPassword";
import { useContext, useEffect } from "react";
import AuthCtx from "./components/context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  const ctxData = useContext(AuthCtx);

  const myRouter = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/signUp",
          element: <SignUp />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <Layout />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/forgetPassword",
          element: <ForgetPassword />,
        },
      ],
    },
  ]);
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />

      <RouterProvider router={myRouter} />
    </div>
  );
}
