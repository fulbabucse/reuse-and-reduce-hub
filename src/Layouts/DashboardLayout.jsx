import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Dashboard/Navbar/Navbar";

const DashboardLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="max-w-screen-xl mx-auto my-2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
