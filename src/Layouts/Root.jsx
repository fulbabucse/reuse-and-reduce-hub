import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";

const Root = () => {
  return (
    <div>
      <Header></Header>
      <div className="max-w-screen-xl mx-auto my-2">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Root;
