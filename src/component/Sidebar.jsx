import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiUsers, FiUserPlus, FiClipboard, FiCalendar, FiCreditCard, FiBriefcase, FiUser, FiInfo, FiSettings, FiLogOut, FiPlusCircle, FiLock, FiBarChart2, FiClock, FiFileText, FiUserCheck } from 'react-icons/fi';
import Cookies from 'js-cookie';


const Sidebar = () => {
   const handleLogout = () => {
      Cookies.remove('token');
      Cookies.remove('role');
      navigate('/');
    };
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
  { label: 'Dashboard', href: '/dashboard', icon: <FiHome /> },
  // system admin,
  { label: 'Users Management', href: '/employees', icon: <FiUsers /> },
  { label: 'Add Employee', href: '/employees/add', icon: <FiUserPlus /> },
  { label: 'Roles & Permissions', href: '/employees', icon: <FiLock /> },

  //hr-admin
  { label: 'Employees', href: '/employees', icon: <FiUsers /> },
  { label: 'Leave Management', href: '/leave-management', icon: <FiCalendar /> },
  { label: 'Attendance', href: '/attendance', icon: <FiClock /> },

  //Financer
  { label: 'Payroll', href: '/payroll', icon: <FiCreditCard /> },
  { label: 'Expense Management', href: '/payroll', icon: <FiPlusCircle /> },

  //Manager
  { label: 'Team member', href: '/attendance', icon: <FiUser /> },
  { label: 'Leave Request', href: '/attendance', icon: <FiCalendar /> },

  //Recruiter
  { label: 'Job Posting', href: '/attendance', icon: <FiFileText /> },
  { label: 'Candidates', href: '/attendance', icon: <FiUserCheck /> },


  { label: 'Apply Leave', href: '/leave/apply', icon: <FiCalendar /> },
  { label: 'Attendance', href: '/attendance', icon: <FiClock /> },
  { label: 'Payroll', href: '/payroll', icon: <FiCreditCard /> },
  { label: 'Departments', href: '/departments', icon: <FiBriefcase /> },
  { label: 'Report', href: '/report', icon: <FiBarChart2 /> },
  { label: 'Profile', href: '/profile', icon: <FiUser /> },
  { label: 'About Us', href: '/aboutus', icon: <FiInfo /> },
  { label: 'Settings', href: '/setting', icon: <FiSettings /> },
  { label: 'Logout', href: '/', icon: <FiLogOut /> },
];

  return (
    <aside className="w-80 bg-white shadow-md h-[calc(100vh-64px)] fixed top-16 left-0 flex flex-col">

      {/* Menu Links */}
      <nav className="flex-1 px-2 py-5 space-y-1 overflow-y-auto custom-scrollbar">
        {navLinks.map((link) =>
          link.action === "logout" ? (
            <button
              key={link.label}
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-md">{link.label}</span>
            </button>
  ) : (
          <NavLink
              key={link.label}
              to={link.href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                    isActive
                    ? "bg-sky-200 font-semibold text-sky-700"
                    : "text-gray-700 hover:bg-sky-50 hover:text-sky-600"
                }`
              }
            >
              <span className="text-xl">{link.icon}</span>
              <span className="text-md">{link.label}</span>
            </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
