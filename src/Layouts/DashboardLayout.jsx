import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Dashboard/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-screen-xl mx-auto my-2 min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayout;
