import React from "react";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../../Contexts/AuthProvider";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <Helmet>
        <title>{user?.displayName} Dashboard - Reuse and Reduce</title>
      </Helmet>
      <h1>Reuse and Reduce Dashboard</h1>
    </div>
  );
};

export default Dashboard;
