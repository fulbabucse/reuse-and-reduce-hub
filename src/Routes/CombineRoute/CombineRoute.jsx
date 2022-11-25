import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import { useCombineUser } from "../../hooks/useCombineUser";
import Spinner from "../../Pages/Shared/Spinner/Spinner";

const CombineRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isCombineUser, isCombineUserLoading] = useCombineUser(user?.email);
  const location = useLocation();

  if (loading || isCombineUserLoading) {
    return <Spinner></Spinner>;
  }

  if (user && isCombineUser) {
    return children;
  }

  return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>;
};

export default CombineRoute;
