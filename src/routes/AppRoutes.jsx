import { Routes, Route } from "react-router-dom";


import UserLayout from "../layout/UserLayout";
import AboutUs from "../pages/AboutUs";
import Login from "../component/auth/login";
import ForgotPassword from "../component/auth/ForgotPassword";
import Dashboard from "../pages/DashBoard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login page - no layout */}
      <Route path="/" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      {/* All other pages wrapped with UserLayout */}
      <Route path="/home" element={<UserLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="aboutus" element={<AboutUs />} />
        {/* Add more nested routes here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
