import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem("auth-token");
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/loginsignup" />
  );
};

export default ProtectedRoute;
