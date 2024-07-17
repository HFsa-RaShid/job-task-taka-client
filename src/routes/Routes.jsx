import { createBrowserRouter } from "react-router-dom";
import Root from "../components/root/Root";
import Home from "../components/Home/Home";
import LogIn from "../components/auth/login/LogIn";
import SignUp from "../components/auth/signUp/SignUp";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root></Root>,
    //   errorElement: <ErrorPage></ErrorPage>,
      
      children: [
        {
          path: "/",
          element: <Home></Home>,
          
        },
        {
            path: "/login",
            element: <LogIn></LogIn>,
            
        },
        {
            path: "/signup",
            element: <SignUp></SignUp>,
            
        },
        
      
      
      ],
    },
  ]);