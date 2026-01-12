import React, { useState } from 'react';
import Footer from '../component/Footer';
import Header from '../component/Header';
import Sidebar from '../component/Sidebar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Header */}
      <Header onMenuClick={() => setIsSidebarOpen(true)} />

      {/* Body */}
      <div className="flex flex-1">
        
        {/* Sidebar */}
        <Sidebar
          isMenuOpen={isSidebarOpen}
          setIsMenuOpen={setIsSidebarOpen}
        />

        {/* Page Content */}
        <main
          className="
            flex-1 bg-gray-50 overflow-auto
            md:ml-75
          "
        >
          <Outlet />
        </main>
      </div>

      {/* Footer (optional) */}
      {/* <Footer /> */}
    </div>
  );
};

export default UserLayout;


// import React, { useState } from "react";
// import Header from "../component/Header";
// import Sidebar from "../component/Sidebar";
// import { Outlet, Navigate } from "react-router-dom";
// import Cookies from "js-cookie";

// const UserLayout = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const role = Cookies.get("role");

//   // 🔐 Block layout if not logged in
//   if (!role) {
//     return <Navigate to="/login" replace />;
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
      
//       {/* Header */}
//       <Header onMenuClick={() => setIsSidebarOpen(true)} />

//       {/* Body */}
//       <div className="flex flex-1">
        
//         {/* Sidebar */}
//         <Sidebar
//           isMenuOpen={isSidebarOpen}
//           setIsMenuOpen={setIsSidebarOpen}
//           role={role} // 👈 pass role
//         />

//         {/* Page Content */}
//         <main
//           className="
//             flex-1 bg-gray-50 overflow-auto
//             md:ml-75
//           "
//         >
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserLayout;
