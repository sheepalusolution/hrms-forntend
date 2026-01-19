// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on refresh
    const savedUser = localStorage.getItem("CURRENT_USER");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    localStorage.setItem("CURRENT_USER", JSON.stringify(user));
    localStorage.setItem("AUTH_TOKEN", "dummy_token");
    setCurrentUser(user);
  };

  const logout = () => {
    localStorage.removeItem("CURRENT_USER");
    localStorage.removeItem("AUTH_TOKEN");
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

// // src/context/AuthContext.jsx
// import React, { createContext, useState, useEffect } from "react";
// import Cookies from "js-cookie";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Load user from cookie on refresh
//     const savedUser = Cookies.get("CURRENT_USER");
//     if (savedUser) {
//       setCurrentUser(JSON.parse(savedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (user) => {
//     // Save in cookie, expires in 7 days
//     Cookies.set("CURRENT_USER", JSON.stringify(user), { expires: 7, path: "/" });
//     Cookies.set("AUTH_TOKEN", "dummy_token", { expires: 7, path: "/" });
//     setCurrentUser(user);
//   };

//   const logout = () => {
//     Cookies.remove("CURRENT_USER", { path: "/" });
//     Cookies.remove("AUTH_TOKEN", { path: "/" });
//     setCurrentUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
