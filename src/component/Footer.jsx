import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/logo/logo.png';

export default function Footer() {
  return (
    <footer className="bg-sky-400 border-t border-gray-200 gap-x-8 gap-y-8 px-8 py-12 flex flex-wrap font-poppins ml-80">
  <div className="max-w-7xl w-full mx-auto flex flex-wrap">
    
    {/* Logo / Site Name */}
    <div className="flex-1 min-w-[180px] max-w-[280px] mr-5 mb-8 flex flex-col items-center">
      <img src={img} alt="HRMS Management" className="w-50 h-auto mb-3" />
      <h2 className="text-lg text-white font-bold">HRMS Management</h2>
    </div>

    {/* Customer Service */}
    <div className="flex-1 min-w-[180px] mb-8">
      <h4 className="text-white font-semibold mb-3">Customer Service</h4>
      <ul className="space-y-2 text-white text-sm">
        <li>Help Desk</li>
        <li>Support, 24/7</li>
        <li>Community of HRMS</li>
      </ul>
    </div>


    {/* Navigation Links */}
    <div className="flex-1 min-w-[180px] mb-8">
      <h4 className="text-white font-semibold mb-3">Navigation</h4>
      <ul className="space-y-2 text-white text-sm">
        <li><Link to="/" className="hover:text-gray-200 transition-colors">Home</Link></li>
        <li><Link to="/about" className="hover:text-gray-200 transition-colors">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-gray-200 transition-colors">Contact</Link></li>
        <li><Link to="/privacy" className="hover:text-gray-200 transition-colors">Privacy</Link></li>
      </ul>
    </div>

    <div className="flex-1 min-w-[180px] mb-8">
      <h4 className="text-white font-semibold mb-3">Customer Service</h4>
      <ul className="space-y-2 text-white text-sm">
        <li>Help Desk</li>
        <li>Support, 24/7</li>
        <li>Community of HRMS</li>
      </ul>
    </div>

    {/* Copyright */}
    <div className="mb-8 flex items-start justify-center md:justify-start">   
      <p className="text-sm text-white text-center md:text-left">
       &copy; {new Date().getFullYear()} HRMS. All rights reserved. 
      </p> 
    </div>

  </div>
</footer>

  );
}
