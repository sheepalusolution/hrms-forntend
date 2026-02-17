// import axios from "axios";

// // Create Axios instance
// const api = axios.create({
//   baseURL: import.meta.env.VITE_BACKEND_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Accept: "application/json",
//   },
// });

// // Optional: request interceptor
// api.interceptors.request.use(
//   (config) => config,
//   (error) => Promise.reject(error)
// );
// // Export the Axios instance if needed elsewhere
// export default api;

// User registration function
// export const registerUser = async (data) => {
//   const response = await api.post("/auth/register", data);
//   return response.data;
// };

import axios from "axios";

const API_BASE_URL = "https://t4fbgm8z-8000.inc1.devtunnels.ms";

export const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (err) {
    console.error("Axios error:", err.response?.data);
    throw err;
  }
};

/**
 * Refresh auth token using refresh token
 * @param {string} refreshToken
 * @returns {Promise<string>} new auth token
 */
export const refreshToken = async (refreshToken) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL} refresh`,
      { refresh_token: refreshToken },
      { headers: { "Content-Type": "application/json", Accept: "application/json" } }
    );

    return response.data; // backend usually returns { access_token, refresh_token, ... }
  } catch (error) {
    if (error.response) {
      throw error.response.data?.message || "Failed to refresh token";
    }
    throw "Network error. Failed to refresh token";
  }
};





