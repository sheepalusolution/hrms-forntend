import React, { useState } from 'react';
import illu from '../../assets/img1.webp';
import img from '../../assets/pic1.png';
import logo from '../../assets/logo/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";

export default function Login() {
  // const [isLogin, setIsLogin] = useState(true);
  // const [role, setRole] = useState(""); // Role state for Sign Up
  const navigate = useNavigate();

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

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home"); // Navigate to Home on login
  };

  // const handleSignUp = (e) => {
  //   e.preventDefault();
  //   console.log("Signup submitted"); // optional debug
  //   setIsLogin(true); // ✅ show Login form
  // };


  const handleForgotPassword = () => {
    navigate("/forgotPassword"); // Navigate to forgot password page
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
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome
              </h2>
              <p className="text-gray-600 mb-6">
                Login to your account and manage your employees efficiently.
              </p>
              <img src={illu} alt="Illustration" className="mt-6 w-100 mx-auto" />
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
              <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Login</h1>
              <p className="text-gray-600 mb-6 text-center">
                Welcome back! Please login to your account.
              </p>

              <form className="space-y-4" onSubmit={handleLogin}>
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

                <div>
                  <label className="block text-gray-700 mb-1" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="********"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end mb-4">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Forgot Password?
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
