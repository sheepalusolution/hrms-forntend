import React, { useState, useEffect } from 'react';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      <div className="flex flex-1">
        <Sidebar
          isMenuOpen={isSidebarOpen}
          setIsMenuOpen={setIsSidebarOpen}
        />

        <main className="flex-1 bg-gray-50 md:ml-75">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
