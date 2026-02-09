import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Optional: request interceptor
api.interceptors.request.use(
  (config) => {
    const toke = localStorage.getItem("Token")
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
