import React from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Contexts/AuthProvider";
import { useAdmin } from "../../../hooks/useAdmin";
import Home from "../Home/Home";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin] = useAdmin(user?.email);
  return (
    <div>
      <Helmet>
        <title>{user?.displayName} Dashboard - Reuse and Reduce</title>
      </Helmet>
      <div>
        <h1>Admin</h1>
      </div>
      {isAdmin && <Home></Home>}
    </div>
  );
};

export default Dashboard;
