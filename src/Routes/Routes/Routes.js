import { createBrowserRouter } from "react-router-dom";
import Root from "../../Layouts/Root";
import About from "../../Pages/About/About";
import Contact from "../../Pages/Contact/Contact";
import Blog from "../../Pages/Blog/Blog";
import Home from "../../Pages/Home/Home/Home";
import SignUp from "../../Pages/User/SignUp/SignUp";
import SignIn from "../../Pages/User/SignIn/SignIn";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      { path: "/", element: <Home></Home> },
      { path: "home", element: <Home></Home> },
      { path: "blog", element: <Blog></Blog> },
      { path: "about", element: <About></About> },
      { path: "contact", element: <Contact></Contact> },
      { path: "sign-up", element: <SignUp></SignUp> },
      { path: "sign-in", element: <SignIn></SignIn> },
    ],
  },
]);
