import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import AboutUs from "../pages/AboutUs";
import Login from "../component/auth/login";
import ForgotPassword from "../component/auth/ForgotPassword";
import Dashboard from "../pages/DashBoard";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";
import SubmitReport from "../pages/report/SubmitReport";
import Review from "../pages/report/Review";
import Notification from "../pages/Notification";
import Department from "../pages/Department";
import AddEmployee from "../pages/admin/AddEmployee";
import Payroll from "../pages/Payroll";
import LeaveRequest from "../pages/LeaveRequest";



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
        <Route path="/profile" element={<Profile />} />
         <Route path="/departments" element={<Department />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/payroll" element={<Payroll />} />
        <Route path="/leaveRequest" element={<LeaveRequest />} />

        {/* report routes */}
        <Route path="/report/submit" element={<SubmitReport />} />
        <Route path="/report/review" element={<Review />} />
       
        
        {/* Sys Admin */}
         <Route path="/addEmployee" element={<AddEmployee />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
