import React, { useState, useContext } from "react";
import illu from "../../assets/img1.webp";
import logo from "../../assets/logo/logo.png";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";
import { ROLE_PERMISSIONS } from "../../service/roles"; // your permissions object

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  const email = e.target.email.value;
  const password = e.target.password.value;

  try {
    const res = await fetch("http://localhost:3030/users"); // json-server endpoint
    const users = await res.json();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    // If no account found, redirect to unauthorized
    if (!user) {
      navigate("/unauthorized");
      setLoading(false);
      return;
    }

    // Check if role exists in ROLE_PERMISSIONS
    if (!ROLE_PERMISSIONS[user.role]) {
      navigate("/unauthorized"); // redirect if role not allowed
      setLoading(false);
      return;
    }

    // Save user in AuthContext
    login(user);

    // Redirect to dashboard (you can customize per role if needed)
    navigate("/dashboard");

  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong");
  } finally {
    setLoading(false);
  }
};


  const handleForgotPassword = () => {
    navigate("/forgotPassword");
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome</h2>
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
            <div className="flex justify-center mb-4 md:hidden">
              <img src={logo} alt="Logo" className="w-42" />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
              Login
            </h1>

            <p className="text-gray-600 mb-6 text-center">
              Welcome back! Please login to your account.
            </p>

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  className="w-full px-4 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-[40px] right-3 text-gray-500 hover:text-sky-600"
                >
                  {showPassword ? <LuEyeClosed size={18} /> : <FiEye size={18} />}
                </button>
              </div>

              <div className="flex justify-end">
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
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}