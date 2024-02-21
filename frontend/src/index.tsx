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
import { createStandaloneToast } from "@chakra-ui/react";


const { ToastContainer, toast } = createStandaloneToast()




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
        loader: async() => {
          const token = localStorage.getItem("access_token");
          if (token){
            try {
              const response = await axios.get("http://localhost:3030/auth/user-projects",
            { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
            } catch (error) {
              toast({
                title: 'An error occurred.',
                description: 'You must be signed in to view this page.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })

              return redirect('/log-in');
            }
           } else {
            console.log("Token", token)
              toast({
                title: 'An error occurred.',
                description: 'You must have an account to view this page.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return redirect('/sign-up')

          }
        },
      },
      {
        path: "/profile",
        element: <Profile/>,
        loader: async() => {
          const token = localStorage.getItem("access_token");
          if (token){
            try {
              const response = await axios.get("http://localhost:3030/auth/profile",
            { headers: { Authorization: `Bearer ${token}` } }
            );
            return response.data;
            } catch (error) {
              toast({
                title: 'An error occurred.',
                description: 'You must be signed in to view this page.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })

              return redirect('/log-in');
            }
           } else {
            console.log("Token", token)
              toast({
                title: 'An error occurred.',
                description: 'You must have an account to view this page.',
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              return redirect('/sign-up')

          }
        },
      },
      {
        path: "/reset-password/:token/:id",
        element: <ResetPassword/>,
      },

    ],
  },
]);

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
      <>
        <ToastContainer />
        <RouterProvider router={router} />
      </>);
