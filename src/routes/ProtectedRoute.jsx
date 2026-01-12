// // ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const ProtectedRoutes = ({ roles, children }) => {
//   const role = Cookies.get("role");

//   if (!role || !roles.includes(role)) {
//     return <Navigate to="/" replace />; // redirect to login if not allowed
//   }

//   return children;
// };

// export default ProtectedRoutes;
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const role = Cookies.get("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
