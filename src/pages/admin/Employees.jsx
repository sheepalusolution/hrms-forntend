import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { LuEyeClosed } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import ConfirmModal from "../../component/ConfirmModel";
import LogoLoading from "../../component/logoLoading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { getAllEmployees } from "../../service/AuthService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const toastShown = useRef(false);

  /* ================= FETCH EMPLOYEES ================= */
useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();

      const mappedEmployees = data.map(emp => ({
        id: emp.id,
        firstName: emp.first_name,
        lastName: emp.last_name,
        email: emp.email,
        phone: emp.ph_no,
        citizenId: emp.user_id,
        gender: emp.gender,
        dob: emp.dob,
        address: emp.address,
        nationality: emp.nationality,
        employee_type: emp.employee_type,
        department: emp.department_id,
        role: emp.role_name  // ✅ this is correct
      }));

      setEmployees(mappedEmployees);
    } catch (err) {
      if (!toastShown.current) {
        toast.error("Failed to fetch employees");
        toastShown.current = true;
      }
    } finally {
      setLoading(false);
    }
  };

  fetchEmployees();
}, []);
  /* ================= SUBMIT ================= */
  

  /* ================= DELETE ================= */
  const [confirm, setConfirm] = useState({
    show: false,
    message: "",
    onConfirm: null,
  });
  const handleDelete = (id) => {
  setConfirm({
    show: true,
    message: "Are you sure you want to delete this employee?",
    onConfirm: async () => {
      try {
        await fetch(`http://localhost:3030/users/${id}`, {
          method: "DELETE",
        });
        setEmployees(prev => prev.filter(e => e.id !== id));
        toast.success("Employee deleted successfully", "success");
      } catch (err) {
        console.error(err);
        toast.error("Delete failed", "error");
      } finally {
        setConfirm({ show: false, message: "", onConfirm: null });
      }
    },
  });
};

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-gray-100 p-6">
      <ConfirmModal
        show={confirm.show}
        message={confirm.message}
        onCancel={() => setConfirm({ show: false, message: "", onConfirm: null })}
        onConfirm={confirm.onConfirm}
      />

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar
        newestOnTop
        pauseOnHover
        theme="colored"
      />    
      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-4">
          Employee List
        </h2>

        <div className="overflow-x-auto customs-scrollbar rounded-lg">
          <table className="w-full min-w-max border border-gray-200 table-auto">
            <thead className="bg-sky-600 text-white">
              <tr>
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Citizenship",
                  "Gender",
                  "Date of Birth",
                  "Address",
                  "Nationality",
                  "Employee Type",
                  "Status",
                  "Department",
                  "Role",
                  "Action",

                ].map((h) => (
                  <th key={h} className="px-4 py-2 text-left ">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
             {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500 italic">
                  <LogoLoading />
                </td>
              </tr>
              ) : employees.length > 0 ? 
              (employees.map((emp) => (
                 <tr key={emp.id} className="hover:bg-gray-50 text-xs sm:text-sm">
                    <td className="px-4 py-2 truncate">{emp.firstName} {emp.lastName}</td>
                      <td className="px-4 py-2 truncate">{emp.email}</td>
                      <td className="px-4 py-2 truncate">{emp.phone}</td>
                      <td className="px-4 py-2 truncate">{emp.citizenId}</td>
                      <td className="px-4 py-2 truncate">{emp.gender}</td>
                      <td className="px-4 py-2 truncate">{emp.dob}</td>
                      <td className="px-4 py-2 truncate">{emp.address}</td>
                      <td className="px-4 py-2 truncate">{emp.nationality}</td>
                      <td className="px-4 py-2 truncate">{emp.employee_type}</td>
                      <td className="px-4 py-2 truncate">{emp.status}</td>
                      <td className="px-4 py-2 truncate">{emp.department}</td>
                      <td className="px-4 py-2 truncate">{emp.role}</td>
                    <td className="px-4 py-2 flex gap-2">
                      <button
                        onClick={() => setEditingEmployee(emp)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                )) 
              ): (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center py-4 text-gray-500 italic"
                    >
                      No employees found
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;

