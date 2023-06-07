import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Root from "./components/Root";
import Home from "./components/pages/Home";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import Layout from "./components/pages/Layout";

export default function App() {
const myRouter=createBrowserRouter([{
  path:"/",
  element:<Root/>,
  children:[
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/signUp',
      element:<SignUp/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/dashboard',
      element:<Layout/>
    },
    

  ]
}])
  return (
    <div>
      <RouterProvider router={myRouter}/>
    

    </div>
  )
}