import { createBrowserRouter } from "react-router-dom";

import Login from "src/pages/Login";
import Products from "src/pages/Products";

import ErrorPage from "src/pages/error-page";

import DefaultLayout from "src/layouts/Default";

import Dashboard from "src/pages/Dashboard";

import ProductForm from "src/components/ProductForm";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
    index: true,
  },
  {
    path: "/",
    element: <DefaultLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/add",
        element: <ProductForm />,
      },
      {
        path: "products/:productId",
        element: <ProductForm />,
      },
    ],
  },
]);

export default router;
