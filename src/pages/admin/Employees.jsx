import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { LuEyeClosed } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import ConfirmModal from "../../component/ConfirmModel";
import LogoLoading from "../../component/logoLoading";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success", // success | error
  });
  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 2500);
  };

  /* ================= FETCH EMPLOYEES ================= */
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:3030/users");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error(err);
        showToast("Something went wrong", "error");
      } finally{
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (values, { resetForm }) => {
    const { confirmPassword, ...payload } = values;

    // Do not update password if empty during edit
    if (editingEmployee && !payload.password) {
      delete payload.password;
    }

    try {
      let res;
      // if (!res.ok) {
      //   throw new Error("Request failed");
      // }

      if (editingEmployee) {
        res = await fetch(
          `http://localhost:3030/users/${editingEmployee.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
      } else {
        res = await fetch("http://localhost:3030/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      const savedUser = await res.json();

      setEmployees((prev) =>
        editingEmployee
          ? prev.map((emp) =>
              emp.id === savedUser.id ? savedUser : emp
            )
          : [...prev, savedUser]
      );

      resetForm();
      setEditingEmployee(null);
      showToast(editingEmployee ? "Employee updated!" : "Employee added!");
    } catch (err) {
      console.error(err);
      showToast("Failed to save employee","error");
    }
  };

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
        showToast("Employee deleted successfully", "success");
      } catch (err) {
        console.error(err);
        showToast("Delete failed", "error");
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

      {toast.show && (
        <div
          className={`fixed top-14 left-1/2 z-50 px-5 py-2 rounded shadow-lg
            text-white transition-all duration-300 -translate-x-1/2 w-96 text-center
            ${toast.type === "success" ? "bg-sky-600" : "bg-black"}`}
        >
          {toast.message}
        </div>
      )}      
      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full mx-auto">
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
                    <td className="px-4 py-2 truncate">{emp.name}</td>
                      <td className="px-4 py-2 truncate">{emp.email}</td>
                      <td className="px-4 py-2 truncate">{emp.phone}</td>
                      <td className="px-4 py-2 truncate">{emp.citizenId}</td>
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

