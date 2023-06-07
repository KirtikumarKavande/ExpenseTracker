import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import Root from "./components/Root";
import Home from "./components/Home";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";

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
      path:'signUp',
      element:<SignUp/>
    },
    {
      path:'Login',
      element:<Login/>
    }
  ]
}])
  return (
    <div>
      <RouterProvider router={myRouter}/>
    

    </div>
  )
}