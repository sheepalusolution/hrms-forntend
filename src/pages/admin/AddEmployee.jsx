import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { LuEyeClosed } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import ConfirmModal from "../../component/ConfirmModel";

const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
      }
    };
    fetchEmployees();
  }, []);

  /* ================= VALIDATION ================= */
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),

    password: editingEmployee
      ? Yup.string()
      : Yup.string().min(6).required("Password is required"),

    confirmPassword: editingEmployee
      ? Yup.string()
      : Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Confirm Password is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),

    department: Yup.string().required("Department is required"),
    role: Yup.string().required("Role is required"),

    citizenId: Yup.string()
      .matches(/^\d+$/, "Citizen ID must be numeric")
      .min(8)
      .max(12)
      .required("Citizen ID is required"),
  });

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
          className={`fixed top-6 right-6 z-50 px-5 py-3 rounded shadow-lg
            text-white transition-all duration-300
            ${toast.type === "success" ? "bg-sky-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}
      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            name: editingEmployee?.name || "",
            email: editingEmployee?.email || "",
            phone: editingEmployee?.phone || "",
            password: "",
            confirmPassword: "",
            department: editingEmployee?.department || "",
            role: editingEmployee?.role || "",
            citizenId: editingEmployee?.citizenId || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form className="space-y-4">
              <FieldBlock label="Name" name="name" />
              <FieldBlock label="Email" name="email" type="email" />

              {!editingEmployee && (
                <div className="flex gap-4">
                  <PasswordField
                    label="Password"
                    name="password"
                    show={showPassword}
                    toggle={() => setShowPassword(!showPassword)}
                  />
                  <PasswordField
                    label="Confirm Password"
                    name="confirmPassword"
                    show={showConfirmPassword}
                    toggle={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  />
                </div>
              )}

              <div className="flex gap-4">
                <FieldBlock label="Phone" name="phone" />
                <FieldBlock label="Citizenship" name="citizenId" />
              </div>

              <div className="flex gap-4">
                <SelectBlock
                  label="Department"
                  name="department"
                  options={["HR", "Finance", "Development", "Marketing"]}
                />
                <SelectBlock
                  label="Role"
                  name="role"
                  options={[
                    "employee",
                    "manager",
                    "hr-admin",
                    "sysadmin",
                  ]}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700 transition-colors duration-300"
                >
                  {editingEmployee ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setEditingEmployee(null);
                  }}
                  className="w-full rounded border-1 border-black/10 text-black hover:bg-gray-800 hover:text-white hover:border-white transition-colors"
                >
                  Discard
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[700px]">
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
              {employees.map((emp) => (
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

/* ================= SMALL COMPONENTS ================= */

const FieldBlock = ({ label, name, type = "text" }) => (
  <div className="flex-1">
    <label className="block mb-1 font-medium">{label}</label>
    <Field name={name} type={type} className="w-full border px-4 py-2 rounded-lg" />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
);

const PasswordField = ({ label, name, show, toggle }) => (
  <div className="flex-1">
    <label className="block mb-1 font-medium">{label}</label>
    <div className="relative">
      <Field
        name={name}
        type={show ? "text" : "password"}
        className="w-full border px-4 py-2 rounded-lg"
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        {show ? <LuEyeClosed /> : <FiEye />}
      </button>
    </div>
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
);

const SelectBlock = ({ label, name, options }) => (
  <div className="flex-1">
    <label className="block mb-1 font-medium">{label}</label>
    <Field as="select" name={name} className="w-full border px-4 py-2 rounded-lg">
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </Field>
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
  </div>
);

export default AddEmployee;

