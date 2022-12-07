import { useSelector } from "react-redux";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
