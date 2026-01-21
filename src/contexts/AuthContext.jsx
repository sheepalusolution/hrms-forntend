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



import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from cookie on refresh
    const savedUser = Cookies.get("CURRENT_USER");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (user) => {
    // Save in cookie, expires in 7 days
    Cookies.set("CURRENT_USER", JSON.stringify(user), { expires: 7, path: "/" });
    Cookies.set("AUTH_TOKEN", "dummy_token", { expires: 7, path: "/" });
    setCurrentUser(user);
    navigate("/dashboard")
  };

  const logout = () => {
    Cookies.remove("CURRENT_USER", { path: "/" });
    Cookies.remove("AUTH_TOKEN", { path: "/" });
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
