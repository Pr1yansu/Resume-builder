import React from "react";
import { Navigate } from "react-router-dom";
import { user } from "@/guard/auth-guard";
const LoginGuard = ({ children }: { children: React.ReactNode }) => {
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

export default LoginGuard;
