import React from "react";
import { Navigate } from "react-router-dom";

export const user = true;

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default AuthGuard;
