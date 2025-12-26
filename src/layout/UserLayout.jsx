import React from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content grows to fill space */}
      <main className="flex-1 min-h-[80dvh]">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default UserLayout;
