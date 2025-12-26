import { Navigate } from "react-router-dom";
import { useRole } from "../contexts/RoleContext";

export const RoleBasedRoute = ({ allowedRoles, children }) => {
  const { role } = useRole();

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />; // redirect if not allowed
  }

  return children;
};
