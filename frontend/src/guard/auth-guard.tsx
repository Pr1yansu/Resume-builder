import Loader from "@/components/loader/loader";
import { useProfileQuery } from "@/services/user";
import React from "react";
import { Navigate } from "react-router-dom";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data, error, isLoading } = useProfileQuery();
  if (isLoading) {
    return <Loader />;
  }
  if (error) {
    return <Navigate to="/login" />;
  }
  const user = data?.user;
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default AuthGuard;
