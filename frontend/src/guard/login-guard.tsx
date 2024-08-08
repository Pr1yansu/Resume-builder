import Loader from "@/components/loader/loader";
import { useProfileQuery } from "@/services/user";
import React from "react";
import { Navigate } from "react-router-dom";
const LoginGuard = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading } = useProfileQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <>{children}</>;
  }
  const user = data?.user;
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

export default LoginGuard;
