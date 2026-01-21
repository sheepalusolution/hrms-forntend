// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function Department() {
//   const [employees, setEmployees] = useState([]); // default empty array
//   const apiUrl = import.meta.env.VITE_API_URL;    // Vite env variable

//   useEffect(() => {
//     axios.get(`${apiUrl}/employees`) // fetch from your json-server
//       .then((res) => {
//          console.log("Response from API:", res.data);
//         if (res.data && res.data.employees) {
//           setEmployees(res.data.employees); // set the array
//          } else if (Array.isArray(res.data)) {
//           setEmployees(res.data); // sometimes json-server returns array directly
//         } else {
//           setEmployees([]);
//         }
//       })
//       .catch((err) => console.error("Error fetching employees:", err));
//   }, []);

//   return (
//     <div className="p-6">
//       <h3>Employees:</h3>
//       {employees.length > 0 ? (
//         <ul className="list-disc pl-5">
//           {employees.map((emp) => (
//             <li key={emp.id} className="mb-2">
//                 <p>{emp.name}</p>
//               <strong>{emp.title}</strong>
//               <p>{emp.body}</p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No employees found.</p>
//       )}
//     </div>
//   );
// }

import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";

const Department = () => {
  const [departments, setDepartments] = useState([
    {
      name:"RIjen Maharjan",
      email:"maharjan@gmail.com",
      id: 1,
      department: "IT",
      role: "Frontend Developer",
      description: "Handles UI and frontend logic",
    },
    {
      name:"Rorojoro mmh",
      email:"rror@gmail.com",
      id: 2,
      department: "HR",
      role: "HR Manager",
      description: "Manages employees and policies",
    },
  ]);

  const [formData, setFormData] = useState({
    department: "",
    role: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDepartments([
      { id: Date.now(), ...formData },
      ...departments,
    ]);
    setFormData({ department: "", role: "", description: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <h1 className="text-2xl font-bold mb-6 text-center">
          Department Management
        </h1>

        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-lg font-semibold mb-4">Add Department</h2>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2"
          >
            <div className="grid grid-rows-2 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-sky-500"
              required
            />

            <input
              type="text"
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-sky-500"
              required
            />
            
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-sky-500"
              required
            />

            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-sky-500"
              required
            /> 
            </div>
            <label className="block mt-6 mb-1 font-medium">Discription</label>
            <textarea
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border rounded px-3 py-2 focus:ring-2 focus:ring-sky-500"
              required
            />
            <div className="md:col-span-3 mt-6">
              <button
                type="submit"
                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 flex items-center gap-2"
              >
                <FiPlus /> Add Department
              </button>
            </div>
          </form>
        </div>

        {/* List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            Department List
          </h2>

          <div className="space-y-4 ">
            {departments.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 flex flex-cols sm:flex-cols sm:items-center sm:justify-between gap-4 hover:bg-gray-50"
              >
                <div>
                  <h1 className="font-bold">{item.name}</h1>
                  <p className="font-semibold">{item.department}</p>
                  <p className="text-sm text-gray-500">
                    Email: {item.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    Role: {item.role}
                  </p>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>

                <span className="text-xs bg-sky-100 text-sky-700 px-3 py-1 rounded self-start ml-auto sm:self-auto">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Department;
