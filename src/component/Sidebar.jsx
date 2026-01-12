import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation} from 'react-router-dom';
import {
  FiHome, FiUsers, FiUserPlus, FiClipboard, FiCalendar, FiCreditCard,
  FiBriefcase, FiUser, FiInfo, FiSettings, FiLogOut, FiPlusCircle,
  FiLock, FiBarChart2, FiClock, FiFileText, FiUserCheck, FiMenu, FiX,FiChevronDown
} from 'react-icons/fi';
import Cookies from 'js-cookie';

const Sidebar = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    navigate('/');
  };


  const location = useLocation();
  const currentPath = location.pathname;


  const navLinks = [
    { label: 'Dashboard', href: '/dashboard', icon: <FiHome />},
//Sysadmin
    { label: 'Users Management', href: '/employees', icon: <FiUsers /> },
    { label: 'Add Employee', href: '/addEmployee', icon: <FiUserPlus /> },
    { label: 'Roles & Permissions', href: '/employees', icon: <FiLock /> },
//hr-admin
    { label: 'Employees', href: '/employees', icon: <FiUsers /> },
    { label: 'Leave Management', href: '/leave-management', icon: <FiCalendar /> },
    { label: 'Attendance', href: '/attendance', icon: <FiClock /> },
//financer
    { label: 'Payroll', href: '/payroll', icon: <FiCreditCard /> },
    { label: 'Expense Management', href: '/payroll', icon: <FiPlusCircle /> },
// Manager
    { label: 'Team member', href: '/attendance', icon: <FiUser /> },
    { label: 'Leave Request', href: '/leaveRequest', icon: <FiCalendar /> },
// Recruiter
    { label: 'Job Posting', href: '/attendance', icon: <FiFileText /> },
    { label: 'Candidates', href: '/attendance', icon: <FiUserCheck /> },
///////
    { label: 'Apply Leave', href: '/leave/apply', icon: <FiCalendar /> },
    { label: 'Departments', href: '/departments', icon: <FiBriefcase /> },
    {
    label: 'Report',
    icon: <FiBarChart2 />,
      children: [
        { label: 'Submit Report', href: '/report/submit' },
        { label: 'View Reports', href: '/report/review' },
      ],
    },
    { label: 'Profile', href: '/profile', icon: <FiUser /> },
    { label: 'About Us', href: '/aboutus', icon: <FiInfo /> },
    { label: 'Settings', href: '/setting', icon: <FiSettings /> },
    { label: 'Logout', icon: <FiLogOut />, action: 'logout' },
  ];

  const [openDropdown, setOpenDropdown] = useState(null);


  return (
    <>
      {/* Mobile Toggle Button */}

      {/* Mobile Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 md:top-16 left-0 z-50
          w-75 h-full md:h-[calc(100vh-64px)]
          bg-slate-50 shadow-md flex flex-col
          transform transition-transform duration-300
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg font-semibold text-sky-600">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <FiX size={22} />
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex-1 px-2 py-3 space-y-1 overflow-y-auto custom-scrollbar">
          {navLinks.map((link, index) =>

            link.action === 'logout' ? (
              <button
                key={link.label}
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-md">{link.label}</span>
              </button>
            ) : link.children ? (
              <div key={link.label}>
                {/* Main Link */}
                <button
                  onClick={() => setOpenDropdown(openDropdown === index ? null : index)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-2 rounded-md transition ${
                    link.children.some(child => child.href === currentPath)
                      ? 'bg-sky-200 font-semibold text-sky-700'
                      : 'text-gray-700 hover:bg-sky-50 hover:text-sky-600'
                  }`}
                    >

                  <div className="flex items-center gap-3">
                    <span className="text-xl">{link.icon}</span>
                    <span className="text-md">{link.label}</span>
                  </div>
                  <span
                      className={`transition-transform duration-300 ${
                        openDropdown === index ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      <FiChevronDown />
                    </span>

                </button>

                {/* Dropdown Links */}
                {openDropdown === index &&
                  link.children.map((child) => (
                    <NavLink
                      key={child.label}
                      to={child.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-10 py-2 rounded-md transition ${
                          isActive ? 'bg-sky-100 font-semibold text-sky-700' : 'text-gray-600 hover:bg-sky-50 hover:text-sky-700'
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
              </div>
            ) : (
              <NavLink
                key={link.label}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                    isActive
                      ? 'bg-sky-200 font-semibold text-sky-700'
                      : 'text-gray-700 hover:bg-sky-50 hover:text-sky-600'
                  }`
                }
              >
                <span className="text-xl">{link.icon}</span>
                <span className="text-md">{link.label}</span>
              </NavLink>
            )
          )}

        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
