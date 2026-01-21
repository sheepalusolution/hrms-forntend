import React, { useState } from 'react';
import illu from '../../assets/reset.png';
import logo from '../../assets/logo/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import { FiEye, FiArrowLeft } from "react-icons/fi";
import Cookies from "js-cookie"; // for storing role

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [role, setRole] = useState(""); // Store selected role for demo

  const panelVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  const formVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleReset = (e) => {
    e.preventDefault();
    navigate("/");

  };

  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100 p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key="login-left"
            className="text-center"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="Logo" className="mx-auto mb-6 w-62" />
            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Forgot your Password!
            </h1>
            <p className="text-gray-600 text-center">
            Securely reset your password in just a few steps.
          </p>
            <img src={illu} alt="Illustration" className="mt-6 w-90 mx-auto" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Right side */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key="login-form"
            className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {/* Mobile Logo */}                  
            <div className="flex justify-center mb-4 md:hidden">
                <img src={logo} alt="Logo" className="w-42" />
            </div>

             {/* Back to Login Button */}
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600 mb-4"
             >
              <FiArrowLeft size={20}/>
            </button>            

            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Reset Password</h1>
             <p className="text-gray-600 mb-6 text-center">
              Enter your registered email to receive password reset instructions.
            </p>
            <form className="space-y-4" onSubmit={handleReset}>
              <div>
                <label className="block text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

               <div className="relative">
                <label className="block text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="********"
                  className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[40px] flex item-center right-3 text-gray-500 hover:text-sky-600">
                  {showPassword ? < LuEyeClosed size={18} /> : <FiEye size={18}/>}
                </button>
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-1" htmlFor="Confirm password">
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="Confirm password"
                  placeholder="********"
                  className="w-full px-4 py-2 pr-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />

                <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-[40px] flex item-center right-3 text-gray-500 hover:text-sky-600">
                  {showConfirmPassword ? < LuEyeClosed size={18} /> : <FiEye size={18}/>}
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md"
              >
                Login
              </button>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
