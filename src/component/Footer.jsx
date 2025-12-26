import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Site Name */}
        <div className="text-lg font-bold text-white mb-4 md:mb-0">
          MyWebsite
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4 mb-4 md:mb-0">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
          <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
        </div>

        {/* Copyright */}
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} MyWebsite. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
