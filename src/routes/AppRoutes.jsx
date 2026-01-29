// import { Routes, Route } from "react-router-dom";
// import UserLayout from "../layout/UserLayout";
// import AboutUs from "../pages/AboutUs";
// import Login from "../component/auth/login";
// import ForgotPassword from "../component/auth/ForgotPassword";
// import Dashboard from "../pages/DashBoard";
// import Setting from "../pages/Setting";
// import Profile from "../pages/Profile";
// import SubmitReport from "../pages/report/SubmitReport";
// import Review from "../pages/report/Review";
// import Notification from "../pages/Notification";
// import Department from "../pages/Department";
// import AddEmployee from "../pages/admin/AddEmployee";
// import Payroll from "../pages/Payroll";
// import LeaveRequest from "../pages/LeaveRequest";
// import ApplyLeave from "../pages/ApplyLeave";
// import Attendance from "../pages/Attendance";



// const AppRoutes = () => {
//   return (
//     <Routes>
//       {/* Public routes (no layout) */}
//       <Route path="/" element={<Login />} />
//       <Route path="/forgotPassword" element={<ForgotPassword />} />

//       {/* Routes with UserLayout */}
//       <Route element={<UserLayout />}>
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/setting" element={<Setting />} />
//         <Route path="/profile" element={<Profile />} />
//          <Route path="/departments" element={<Department />} />
//         <Route path="/notification" element={<Notification />} />
//         <Route path="/payroll" element={<Payroll />} />
//         <Route path="/applyLeave" element={<ApplyLeave />} />
//         <Route path="/leaveRequest" element={<LeaveRequest />} />
//         <Route path="/attendance" element={<Attendance />} />

//         {/* report routes */}
//         <Route path="/report/submit" element={<SubmitReport />} />
//         <Route path="/report/review" element={<Review />} />
       
        
//         {/* Sys Admin */}
//          <Route path="/addEmployee" element={<AddEmployee />} />
//       </Route>
//     </Routes>
//   );
// };

// export default AppRoutes;


import { Routes, Route } from "react-router-dom";

import UserLayout from "../layout/UserLayout";

// Public pages

import ForgotPassword from "../component/auth/ForgotPassword";

// Auth & Protection

import ProtectedRoute from "../routes/ProtectedRoute";

// Pages
import Dashboard from "../pages/DashBoard";
import AboutUs from "../pages/AboutUs";
import Setting from "../pages/Setting";
import Profile from "../pages/Profile";
import Notification from "../pages/Notification";
import Department from "../pages/Department";
import Attendance from "../pages/Attendance";
import ApplyLeave from "../pages/ApplyLeave";
import LeaveRequest from "../pages/LeaveRequest";

// Reports
import SubmitReport from "../pages/report/SubmitReport";
import Review from "../pages/report/Review";

// Admin
import AddEmployee from "../pages/admin/AddEmployee";
import Unauthorized from "../component/auth/Unauthorized";

import Login from "../component/auth/Login";
import SalaryManagement from "../pages/payroll/SalaryMgmt";
import PayrollProcessing from "../pages/payroll/PayrollProcessing";
import Auth from "../service/Auth";

// Unauthorized


const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/forgotPassword" element={<ForgotPassword />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* ================= AUTHENTICATED ROUTES ================= */}
      <Route element={<Auth />}>
        <Route element={<UserLayout />}>

          {/* Dashboard (ALL ROLES) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute feature="dashboard">
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/aboutus"
            element={
              <ProtectedRoute feature="dashboard">
                <AboutUs />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute feature="dashboard">
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/setting"
            element={
              <ProtectedRoute feature="dashboard">
                <Setting />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notification"
            element={
              <ProtectedRoute feature="dashboard">
                <Notification />
              </ProtectedRoute>
            }
          />

          {/* ================= HR / ADMIN ================= */}
          <Route
            path="/departments"
            element={
              <ProtectedRoute feature="employees">
                <Department />
              </ProtectedRoute>
            }
          />

          <Route
            path="/addEmployee"
            element={
              <ProtectedRoute feature="employees">
                <AddEmployee />
              </ProtectedRoute>
            }
          />

          {/* ================= PAYROLL / FINANCE ================= */}
          {/* <Route
            path="/payroll"
            element={
              <ProtectedRoute feature="finance">
                <Payroll />
              </ProtectedRoute>
            }
          /> */}

          {/* ================= ATTENDANCE & LEAVE ================= */}
          <Route
            path="/attendance"
            element={
              <ProtectedRoute feature="attendance">
                <Attendance />
              </ProtectedRoute>
            }
          />

          <Route
            path="/applyLeave"
            element={
              <ProtectedRoute feature="attendance">
                <ApplyLeave />
              </ProtectedRoute>
            }
          />

          <Route
            path="/leaveRequest"
            element={
              <ProtectedRoute feature="attendance">
                <LeaveRequest />
              </ProtectedRoute>
            }
          />

          {/*=================== payroll============== */}
           <Route
            path="/payroll/management"
            element={
              <ProtectedRoute feature="salary-mgmt">
                <SalaryManagement />
              </ProtectedRoute>
            }
          />
            {/* { label: "Salary Management", href: "/payroll/salaryMgmt", feature: "salary-mgmt" }, */}
          <Route
            path="/payroll/processing"
            element={
              <ProtectedRoute feature="payroll-processing">
                <PayrollProcessing />
              </ProtectedRoute>
            }
          />
            

          {/* ================= REPORTS ================= */}
          <Route
            path="/report/submit"
            element={
              <ProtectedRoute feature="report-submit">
                <SubmitReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/report/review"
            element={
              <ProtectedRoute feature="report-review">
                <Review />
              </ProtectedRoute>
            }
          />

        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
