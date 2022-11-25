import React from "react";
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthProvider";
import { useSeller } from "../../hooks/useSeller";
import Spinner from "../../Pages/Shared/Spinner/Spinner";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, sellerLoading] = useSeller();
  const location = useLocation();

  if (loading || sellerLoading) {
    return <Spinner></Spinner>;
  }

  if (user && isSeller) {
    return children;
  }

  return <Navigate to="/sign-in" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
