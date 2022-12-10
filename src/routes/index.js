import {
    createBrowserRouter,
  } from "react-router-dom";

import Login from 'src/pages/Login';
import Products from 'src/pages/Products'

import ErrorPage from 'src/pages/error-page'

const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
      errorElement: <ErrorPage />,
    },
    {
      path: "products",
      element: <Products />,
    },
]);

export default router

