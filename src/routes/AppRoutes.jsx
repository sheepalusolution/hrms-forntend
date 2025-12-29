import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import AboutUs from "../pages/AboutUs";
import Login from "../component/auth/login";
import ForgotPassword from "../component/auth/ForgotPassword";
import Dashboard from "../pages/DashBoard";
import Setting from "../pages/Setting";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes (no layout) */}
      <Route path="/" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />

      {/* Routes with UserLayout */}
      <Route element={<UserLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
