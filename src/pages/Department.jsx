import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Department() {
  const [employees, setEmployees] = useState([]); // default empty array
  const apiUrl = import.meta.env.VITE_API_URL;    // Vite env variable

  useEffect(() => {
    axios
      .get(`${apiUrl}/employees`) // fetch from your json-server
      .then((res) => {
         console.log("Response from API:", res.data);
        if (res.data && res.data.employees) {
          setEmployees(res.data.employees); // set the array
         } else if (Array.isArray(res.data)) {
          setEmployees(res.data); // sometimes json-server returns array directly
        } else {
          setEmployees([]);
        }
      })
      .catch((err) => console.error("Error fetching employees:", err));
  }, [apiUrl]);

  return (
    <div className="p-6">
      <h3>Employees:</h3>
      {employees.length > 0 ? (
        <ul className="list-disc pl-5">
          {employees.map((emp) => (
            <li key={emp.id} className="mb-2">
                <p>{emp.name}</p>
              <strong>{emp.title}</strong>
              <p>{emp.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
  );
}
