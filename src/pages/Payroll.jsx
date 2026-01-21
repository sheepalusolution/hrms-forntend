// import React from "react";

// const Payroll = () => {
//   const payrollData = [
//     {
//       id: 1,
//       name: "John Doe",
//       role: "Developer",
//       salary: 60000,
//       month: "January",
//       status: "Paid",
//     },
//     {
//       id: 2,
//       name: "Jane Smith",
//       role: "HR Manager",
//       salary: 55000,
//       month: "January",
//       status: "Pending",
//     },
//     {
//       id: 3,
//       name: "Michael Brown",
//       role: "Accountant",
//       salary: 50000,
//       month: "January",
//       status: "Paid",
//     },
//   ];

//   return (
//     <div className="p-6">
//       {/* Page Header */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">Payroll</h1>
//         <button className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition">
//           Generate Payroll
//         </button>
//       </div>

//       {/* Payroll Table */}
//       <div className="bg-white shadow-md rounded-lg overflow-x-auto">
//         <table className="min-w-full border-collapse">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
//                 Employee
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
//                 Role
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
//                 Month
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
//                 Salary
//               </th>
//               <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {payrollData.map((item) => (
//               <tr
//                 key={item.id}
//                 className="border-t hover:bg-gray-50 transition"
//               >
//                 <td className="px-4 py-3 text-gray-700">{item.name}</td>
//                 <td className="px-4 py-3 text-gray-700">{item.role}</td>
//                 <td className="px-4 py-3 text-gray-700">{item.month}</td>
//                 <td className="px-4 py-3 text-gray-700">
//                   ₹ {item.salary.toLocaleString()}
//                 </td>
//                 <td className="px-4 py-3">
//                   <span
//                     className={`px-3 py-1 rounded-full text-sm font-medium
//                       ${
//                         item.status === "Paid"
//                           ? "bg-green-100 text-green-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }
//                     `}
//                   >
//                     {item.status}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Payroll;
