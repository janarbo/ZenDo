import * as React from "react";
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App"
import LogIn from "./Pages/LogIn";
import SignUp from "./Pages/SignUp";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
       {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/log-in",
        element: <LogIn/>,
      },
    ],
  },
]);

const root = createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router} />);
