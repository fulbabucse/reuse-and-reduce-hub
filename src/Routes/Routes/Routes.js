import { createBrowserRouter } from "react-router-dom";
import Root from "../../Layouts/Root";
import About from "../../Pages/About/About";
import Contact from "../../Pages/Contact/Contact";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home/Home/Home";
import SignUp from "../../Pages/User/SignUp/SignUp";
import SignIn from "../../Pages/User/SignIn/SignIn";
import DashboardLayout from "../../Layouts/DashboardLayout";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Sellers from "../../Pages/Dashboard/Users/Sellers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AllProducts from "../../Pages/Dashboard/Products/AllProducts";
import AddProduct from "../../Pages/Dashboard/Products/AddProduct";
import HomeProducts from "../../Pages/Home/HomeProducts/HomeProducts";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import ErrorPage from "../../Pages/ErrorPage/ErrorPage";
import MyProducts from "../../Pages/Dashboard/Products/MyProducts";
import MyOrders from "../../Pages/Dashboard/MyOrders/MyOrders";
import CombineRoute from "../CombineRoute/CombineRoute";
import Payments from "../../Pages/Dashboard/Payments/Payments";
import MyBuyers from "../../Pages/Dashboard/MyBuyers/MyBuyers";
import ReportedProducts from "../../Pages/Dashboard/Products/ReportedProducts";
import Buyers from "../../Pages/Dashboard/Users/Buyers";
import MakeAdmin from "../../Pages/Dashboard/Users/MakeAdmin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "home", element: <Home></Home> },
      {
        path: "blog",
        element: <Blog></Blog>,
      },
      { path: "about", element: <About></About> },
      { path: "contact", element: <Contact></Contact> },
      { path: "sign-up", element: <SignUp></SignUp> },
      { path: "sign-in", element: <SignIn></SignIn> },
      {
        path: "/category/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/categories/${params.id}`),
        element: (
          <PrivateRoute>
            <HomeProducts></HomeProducts>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <ErrorPage></ErrorPage>,
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/make-admin",
        element: (
          <AdminRoute>
            <MakeAdmin></MakeAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-sellers",
        element: (
          <AdminRoute>
            <Sellers></Sellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/all-buyers",
        element: (
          <AdminRoute>
            <Buyers></Buyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/reported-products",
        element: (
          <AdminRoute>
            <ReportedProducts></ReportedProducts>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/add-product",
        element: (
          <CombineRoute>
            <AddProduct></AddProduct>
          </CombineRoute>
        ),
      },
      {
        path: "/dashboard/my-products",
        element: (
          <CombineRoute>
            <MyProducts></MyProducts>
          </CombineRoute>
        ),
      },
      {
        path: "/dashboard/my-buyers",
        element: (
          <CombineRoute>
            <MyBuyers></MyBuyers>
          </CombineRoute>
        ),
      },
      {
        path: "/dashboard/my-orders",
        element: (
          <PrivateRoute>
            <MyOrders></MyOrders>
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/payments/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
        element: (
          <PrivateRoute>
            <Payments></Payments>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
