// src/routes/PrivateRoute.jsx
import { type ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRouteProps {
  children?: ReactElement;
  isAuthenticated: boolean;
  adminOnly?: boolean;
  isAdmin?: boolean;
  redirectPath?: string;
}

export default function ProtectedRoute({
  children,
  isAuthenticated,
  adminOnly,
  isAdmin,
  redirectPath = "/",
}: PrivateRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
}
