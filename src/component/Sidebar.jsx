import React, { useState, useContext } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome, FiUsers, FiUserPlus, FiCalendar, FiCreditCard,
  FiBriefcase, FiUser, FiInfo, FiSettings, FiLogOut,
  FiLock, FiBarChart2, FiClock, FiFileText,
  FiUserCheck, FiX, FiChevronDown
} from "react-icons/fi";

import { AuthContext } from "../contexts/AuthContext";
import { ROLE_PERMISSIONS } from "../service/roles";

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const { currentUser, logout } = useContext(AuthContext);
  const role = currentUser?.role;
  const permissions = ROLE_PERMISSIONS[role] || [];

  const hasAccess = (feature) =>
    permissions.includes("*") || permissions.includes(feature);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { label: "Dashboard", href: "/dashboard", icon: <FiHome />, feature: "dashboard" },

    // Sysadmin / HR
    { label: "Employees", href: "/employees", icon: <FiUsers />, feature: "employees" },
    { label: "Add Employee", href: "/addEmployee", icon: <FiUserPlus />, feature: "employees" },
    { label: "Roles & Permissions", href: "/roles", icon: <FiLock />, feature: "employees" },

    // Attendance / Leave
    { label: "Attendance", href: "/attendance", icon: <FiClock />, feature: "attendance" },
    { label: "Apply Leave", href: "/applyLeave", icon: <FiCalendar />, feature: "apply-leave" },
    { label: "Leave Request", href: "/leaveRequest", icon: <FiCalendar />, feature: "leave-request" },

    // Finance
    // { label: "Payroll", href: "/payroll", icon: <FiCreditCard />, feature: "payroll" },
    {
      label: "Payroll",
      icon: <FiCreditCard />,
      children: [
        { label: "Salary Management", href: "/payroll/management", feature: "salary-mgmt" },
        { label: "Payroll Processing", href: "/payroll/processing", feature: "payroll-processing" },
        { label: "Payslip", href: "/payroll/payslip", feature: "payslip" }
      ]
    },

    // Recruiter
    { label: "Candidates", href: "/candidates", icon: <FiUserCheck />, feature: "candidates" },

    // Departments
    { label: "Departments", href: "/departments", icon: <FiBriefcase />, feature: "departments" },

    // Reports (Dropdown)
    {
      label: "Report",
      icon: <FiBarChart2 />,
      children: [
        { label: "Submit Report", href: "/report/submit", feature: "report-submit" },
        { label: "View Reports", href: "/report/review", feature: "report-review" }
      ]
    },

    { label: "Profile", href: "/profile", icon: <FiUser />, feature: "profile" },
    { label: "About Us", href: "/aboutus", icon: <FiInfo />, feature: "about" },
    { label: "Settings", href: "/setting", icon: <FiSettings />, feature: "settings" },

    { label: "Logout", icon: <FiLogOut />, action: "logout" }
  ];

  const [openDropdown, setOpenDropdown] = useState(null);

  return (
    <>
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 md:top-16 left-0 z-50 w-75 h-full md:h-[calc(100vh-64px)]
          bg-slate-50 shadow-md flex flex-col
          transform transition-transform duration-300
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold text-sky-600">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {/* Scrollable menu */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <nav className="px-2 py-3 space-y-1">
            {navLinks.map((link, index) => {
              // LOGOUT (always visible at bottom)
              if (link.action === "logout") {
                return (
                  <button
                    key={link.label}
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 mt-auto text-red-600 hover:bg-red-50 rounded-md"
                  >
                    {link.icon}
                    {link.label}
                  </button>
                );
              }

              // DROPDOWN
              if (link.children) {
                const visibleChildren = link.children.filter(child =>
                  hasAccess(child.feature)
                );
                if (!visibleChildren.length) return null;

                return (
                  <div key={link.label}>
                    <button
                      onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                      className="w-full flex items-center justify-between px-4 py-2 rounded-md hover:bg-sky-50"
                    >
                      <div className="flex items-center gap-3">
                        {link.icon}
                        {link.label}
                      </div>
                      <FiChevronDown
                        className={`transition ${openDropdown === index ? "rotate-180" : ""}`}
                      />
                    </button>

                    {openDropdown === index &&
                      visibleChildren.map(child => (
                        <NavLink
                          key={child.label}
                          to={child.href}
                          className="block px-10 py-2 text-gray-600 hover:bg-sky-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {child.label}
                        </NavLink>
                      ))}
                  </div>
                );
              }

              // NORMAL LINK
              if (!hasAccess(link.feature)) return null;

              return (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md ${
                      isActive ? "bg-sky-200 text-sky-700" : "text-gray-700 hover:bg-sky-50"
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              );
            })}
          </nav>
        </div>
      </aside>

    </>
  );
};

export default Sidebar;
