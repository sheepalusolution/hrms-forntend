import React from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <Header />

      {/* Body: Sidebar + Page Content */}
      <div className="flex flex-1 ">
        <Sidebar /> {/* Left sidebar */}
        <main className="flex-1 bg-gray-50 ml-64 overflow-auto">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
{/* 
      <Footer /> */}
    </div>
  );
};

export default UserLayout;
