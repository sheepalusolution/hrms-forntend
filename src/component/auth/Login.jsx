import React, { useState, useContext, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LuEyeClosed } from "react-icons/lu";
import { FiEye } from "react-icons/fi";

import illu from "../../assets/img1.webp";
import logo from "../../assets/logo/logo.png";
import { AuthContext } from "../../contexts/AuthContext";
import { ROLE_PERMISSIONS } from "../../service/roles";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

   useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const email = e.target.email.value.trim();
  const password = e.target.password.value;
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login response:", data);

    if (!res.ok) {
      setError(data.message || "Invalid email or password");
      return;
    }

    // Use role_name (string) for permissions
    const role = data.role_name?.toLowerCase();
    if (!ROLE_PERMISSIONS[role]) {
      console.log("Unauthorized role:", role);
      navigate("/unauthorized");
      return;
    }

    // Save user with string role
    login({ ...data, role },
      data.access_token, 
      data.refresh_token 
    );

    navigate("/dashboard");
  } catch (err) {
    console.error("Login error:", err);
    setError("Server error. Please try again.");
  } finally {
    setLoading(false);
  }
};
  const handleForgotPassword = () => {
    navigate("/forgotPassword");
  };


  return (
    <div className="flex min-h-screen">
      {/* LEFT - Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-100 p-10">
        <AnimatePresence mode="wait">
          <motion.div
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <img src={logo} alt="Logo" className="mx-auto mb-6 w-60" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back</h2>
            <p className="text-gray-600 mb-6">
              Login to manage your employees efficiently.
            </p>
            <img src={illu} alt="Illustration" className="mt-6 mx-auto w-96" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* RIGHT - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            variants={formVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
          >
            <div className="flex justify-center mb-4 md:hidden">
              <img src={logo} alt="Logo" className="w-40" />
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">Login</h1>
            <p className="text-gray-600 text-center mb-6">Please login to your account</p>

             {/* 🔔 Error Toggler */}
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="mb-4 rounded-md bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700 flex justify-between items-center"
              >
                <span>{error}</span>
                <button
                  type="button"
                  onClick={() => setError("")}
                  className="font-semibold hover:text-blue-900"
                >
                  ✕
                </button>
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <label className="block text-gray-700 mb-1">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  placeholder="********"
                  className="w-full px-4 py-2 pr-10 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[40px] text-gray-500"
                >
                  {showPassword ? <LuEyeClosed /> : <FiEye />}
                </button>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-blue-600 hover:underline"
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
