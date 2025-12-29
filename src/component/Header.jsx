import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiBell, FiLogOut, FiSearch, FiUser } from 'react-icons/fi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell} from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo/logo.png';


import Cookies from 'js-cookie';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`); // replace with real search logic
  };

  const handleProfileClick = () => {
    navigate('/profile'); // navigate to profile page
  };

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('role');
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center h-full ">
            <Link to="/dashboard" className='flex items-center gap-3'>
            <img src={logo} alt="HRMS Management" className="w-30 h-auto mb-3" />
            <span className="text-1xl font-bold text-sky-600">HRMS Management</span>

            </Link>
          </div>
           
          {/* Search Bar */}
          <div className="flex justify-center align-center mx-4">
            <form onSubmit={handleSearch} className="relative w-[700px]">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
              <FiSearch className="absolute inset-y-0 left-3 top-2.5 text-gray-400" size={20} />
            </form>
          </div>

          {/* Btns */}
          <div className="flex items-center gap-4">
            {/* Notification-Btns */}
            <button
              className="text-gray-700 hover:text-sky-600 w-8 h-8 flex items-center justify-center"
            >
              <div className="w-8 h-8 flex items-center justify-center  rounded-full">
                <FontAwesomeIcon icon={faBell} size="lg" />
              </div>
            </button>

            {/* profile-Btns */}
            <button
              onClick={handleProfileClick}
              className="flex items-center gap-2 text-gray-700 hover:text-sky-600"
            >
              <div className="w-8 h-8 flex items-center justify-center rounded-full">
                <FontAwesomeIcon icon={faUser} size="lg" />
              </div>
            </button>

            {/* <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-sky-600 w-8 h-8 flex items-center justify-center"
            >
              <FiLogOut size="lg"/>
            </button> */}
          </div>

          {/* Mobile menu button (optional) */}
          {/* You can remove this if not needed since menu links are gone */}
        </div>
      </div>
    </header>
  );
};

export default Header;
