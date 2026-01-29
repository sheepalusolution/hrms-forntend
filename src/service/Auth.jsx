import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Auth = ({ allowedRoles }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) return null;

  // Not logged in
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // Role-based access (optional)
 if (
    allowedRoles &&
    !allowedRoles.includes(currentUser.role) &&
    currentUser.role !== "superadmin"
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default Auth;
