import React from 'react'

export default function Notification() {
  return (
     <div className="flex flex-col items-center justify-center align-center h-screen bg-gray-100 gap-6">
      <h1 className="text-3xl font-bold text-black-300">
        No Notification
      </h1>

      
    </div>
  )
}


// import React, { useState } from "react";

// const Attendance = () => {
//   const [isClockedIn, setIsClockedIn] = useState(false);
//   const [attendanceList, setAttendanceList] = useState([]);

//   const handleClockIn = () => {
//     const now = new Date();

//     const newEntry = {
//       date: now.toLocaleDateString(),
//       timeIn: now.toLocaleTimeString(),
//       timeOut: null,
//     };

//     setAttendanceList(prev => [newEntry, ...prev]);
//     setIsClockedIn(true);
//   };

//   const handleClockOut = () => {
//     const now = new Date();

//     setAttendanceList(prev =>
//       prev.map((item, index) =>
//         index === 0 ? { ...item, timeOut: now.toLocaleTimeString() } : item
//       )
//     );

//     setIsClockedIn(false);
//   };

//   const lastClockIn = attendanceList[0]?.timeIn || "--";
//   const lastClockOut = attendanceList[0]?.timeOut || "--";

//   return (
//     <div className="max-w-5xl mx-auto mt-10 flex flex-col md:flex-row gap-6 p-4 items-start">
     
//       {/* LEFT: Clock In / Out */}
//       <div className="w-full bg-white p-6 shadow rounded md:w-1/3 h-fit">
//         <h2 className="text-xl font-bold mb-4 text-center">
//           Clock In / Out
//         </h2>

//         {/* Last Clock Info */}
//         <div className="space-y-4 mb-6">
//           <div className="p-3 border rounded text-center">
//             <p className="text-sm text-gray-500">Last Clock In</p>
//             <p className="font-semibold">{lastClockIn}</p>
//           </div>

//           <div className="p-3 border rounded text-center">
//             <p className="text-sm text-gray-500">Last Clock Out</p>
//             <p className="font-semibold">
//               {lastClockOut === null ? "Present" : lastClockOut}
//             </p>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-center">
//           {!isClockedIn ? (
//             <button
//               onClick={handleClockIn}
//               className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
//             >
//               Clock In
//             </button>
//           ) : (
//             <button
//               onClick={handleClockOut}
//               className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
//             >
//               Clock Out
//             </button>
//           )}
//         </div>
//       </div>

//       {/* RIGHT: Attendance List */}
//       <div className="w-full md:w-2/3 bg-white p-6 shadow rounded self-start">
//         <h2 className="text-xl font-bold mb-4">
//           Attendance History
//         </h2>

//         {attendanceList.length === 0 ? (
//           <p className="text-gray-500 text-sm">
//             No attendance records yet.
//           </p>
//         ) : (
//           <ul className="space-y-2">
//             {attendanceList.map((item, index) => (
//               <li
//                 key={index}
//                 className="flex justify-between p-3 border rounded hover:bg-gray-50"
//               >
//                 <span>{item.date}</span>
//                 <span className="font-medium">
//                   {item.timeIn} - {item.timeOut || "Present"}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//     </div>
//   );
// };

// export default Attendance;