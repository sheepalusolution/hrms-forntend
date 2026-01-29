import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ROLE_PERMISSIONS } from "../service/roles";

const ProtectedRoute = ({ children, feature }) => {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  const role = currentUser.role_name;
  const permissions = ROLE_PERMISSIONS[role];

  if (!permissions) {
    return <Navigate to="/unauthorized" replace />;
  }

  // sysadmin can access everything
  if (permissions.includes("*")) {
    return children;
  }

  // check feature permission
  if (!permissions.includes(feature)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
