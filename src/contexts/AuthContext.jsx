// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Load from localStorage on refresh
//     const savedUser = localStorage.getItem("CURRENT_USER");
//     if (savedUser) {
//       setCurrentUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (user) => {
//     // localStorage.setItem("CURRENT_USER", JSON.stringify(user));
//     // localStorage.setItem("AUTH_TOKEN", "dummy_token");
//     // setCurrentUser(user);
//    const{ password, ...userWithoutPassword } = user;
//     localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
//     // Set a simple token (just for demonstration)
//     localStorage.setItem("auth_token", "mock_token_" + Date.now());
    
//     setCurrentUser(userWithoutPassword);
    
//     // Return success
//     return { success: true, user: userWithoutPassword };
//   };

//   const logout = () => {
//     localStorage.removeItem("CURRENT_USER");
//     localStorage.removeItem("AUTH_TOKEN");
//     setCurrentUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout, loading}}>
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { refreshToken } from "../service/AuthService";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load user and token from cookie on refresh
  useEffect(() => {
    const savedUser = Cookies.get("CURRENT_USER");
    const token = Cookies.get("AUTH_TOKEN");
    if (savedUser && token) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (user, authToken, refreshTokenValue) => {
    Cookies.set("CURRENT_USER", JSON.stringify(user), { expires: 7, path: "/" });
    Cookies.set("AUTH_TOKEN", authToken, { expires: 7, path: "/" });
    Cookies.set("REFRESH_TOKEN", refreshTokenValue, { expires: 7, path: "/" });
    setCurrentUser(user);
    navigate("/dashboard");
  };

  const logout = () => {
    Cookies.remove("CURRENT_USER", { path: "/" });
    Cookies.remove("AUTH_TOKEN", { path: "/" });
    Cookies.remove("REFRESH_TOKEN", { path: "/" });
    setCurrentUser(null);
    navigate("/");
  };

  // Function to refresh token
  const handleRefreshToken = useCallback(async () => {
    const refreshTokenValue = Cookies.get("REFRESH_TOKEN");
    if (!refreshTokenValue) {
      logout();
      return null;
    }

    try {
      const data = await refreshToken(refreshTokenValue);
      // Save new token(s)
      if (data.access_token) {
        Cookies.set("AUTH_TOKEN", data.access_token, { expires: 7, path: "/" });
      }
      if (data.refresh_token) {
        Cookies.set("REFRESH_TOKEN", data.refresh_token, { expires: 7, path: "/" });
      }
      return data.access_token;
    } catch (err) {
      console.error("Token refresh failed:", err);
      logout();
      return null;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading, handleRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

