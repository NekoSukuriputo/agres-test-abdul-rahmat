import {
    createBrowserRouter,
  } from "react-router-dom";

import Login from 'src/pages/Login';

import ErrorPage from 'src/pages/error-page'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
      errorElement: <ErrorPage />,
    },
]);

export default router

