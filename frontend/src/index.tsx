import * as React from "react";
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from "./App"
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";
import Projects from "./Pages/Project";
import Profile from "./Pages/Profile";
import axios from "axios";
import ResetPassword from "./Pages/ResetPassword";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async() => {
      const token = localStorage.getItem("access_token");
      if (token){
        try {
          const response = await axios.get("http://localhost:3030/auth/profile",
        { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
        } catch (error) {
          return {};
        }
       } else {
          return {};
      }
    },

    children: [
       {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/log-in",
        element: <LogIn/>,
      },
      {
        path: "/projects",
        element: <Projects/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
        loader: async() => {
          const token = localStorage.getItem("access_token");
          console.log("TOKEN", token)
          if (token){
            try {
              const response = await axios.get("http://localhost:3030/auth/profile",
            { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
            } catch (error) {
              console.log('ERROR', error);
              return ('error');
            }
           } else {
              console.log('No Token');
              return ('No Token');
          }

        },
      },
      {
        path: "/reset-password/",
        element: <ResetPassword/>,
      },

    ],
  },
]);

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
