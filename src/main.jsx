import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { AuthProvider } from "./contexts/AuthContext";
import { SkeletonTheme } from "react-loading-skeleton";
// import { AuthProvider } from "./contexts/AuthContext"; // optional

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#b7b7b7" highlightColor="#444">
    <BrowserRouter>
      <AuthProvider>   {/* optional if you have AuthContext */}
        {/* <RoleProvider> */}
          <App />
        {/* </RoleProvider> */}
      </AuthProvider>
    </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>
);
