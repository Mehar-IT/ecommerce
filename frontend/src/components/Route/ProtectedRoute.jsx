import { useSelector } from "react-redux";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const UserProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export const AdminProtectedRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (isAuthenticated === false) {
    return <Navigate to="/login" />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};
