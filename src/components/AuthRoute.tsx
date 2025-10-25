import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "@tanstack/react-router";
import { type ReactNode } from "react";

interface AuthRouteProps {
  children: ReactNode;
}

export const AuthRoute = ({ children }: AuthRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
