import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { LuEyeClosed } from "react-icons/lu";
import { FiEye } from "react-icons/fi";
import ConfirmModal from "../../component/ConfirmModel";
import LogoLoading from "../../component/logoLoading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerUser } from "../../service/AuthService";
import { getAllEmployees } from "../../service/EmployeesService";
import Pagination from "../../component/Pagination";


const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const toastShown = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 




  /* ================= FETCH EMPLOYEES ================= */
  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      //real
      //  const res = await fetch("http://localhost:4000/users");
      // const data = await res.json();
      //fake
      console.log("api data", data)
      setEmployees(data);
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

  /* ================= VALIDATION ================= */
  const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),

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

  gender: Yup.string()
    .oneOf(["Male", "Female"])
    .required("Gender is required"),

  dob: Yup.date()
    .required("Date of birth is required"),

  nationality: Yup.string().required("Nationality is required"),

  employee_type: Yup.string()
    .oneOf(["Full_time", "Part_time","Intern"])
    .required("Employee type is required"),

  address: Yup.string().required("Address is required"),
});


  /* ================= SUBMIT ================= */
  const handleSubmit = async (values, { resetForm }) => {
  const id = toast.loading(
    editingEmployee ? "Updating employee..." : "Registering employee..."
  );

  try {

    const employeeTypeMap = {
        "Full_time": "full_time",
        "Intern": "intern",
      };

    // 🔁 transform form values → backend payload
    const payload = {
      first_name: values.firstName?.trim(),
      last_name: values.lastName?.trim(),
      email: values.email?.trim().toLowerCase(),
      password: values.password, // required only on create

      ph_no: values.phone,
      nationality: values.nationality,
      address: values.address,

      gender: values.gender.toLowerCase(), // "male" | "female"
      dob: values.dob, // YYYY-MM-DD (already fine)

      department_name: values.department.toLowerCase(),
      role_name: values.role,
      employee_type: employeeTypeMap[values.employee_type] || values.employee_type,

      // ⚠️ backend-required but UI-independent fields
      deparment_id: 4,   // backend expects this
      role_id: 3,        // backend expects this
      join_date: new Date().toISOString().slice(0, 10),
      end_date: new Date().toISOString().slice(0, 10),
    };
    if (editingEmployee) {
      delete payload.password;
    }



    // 🔥 CALL AXIOS SERVICE (NO fetch)
    console.log("API base:", import.meta.env.VITE_BACKEND_URL);

    console.log("Register payload:", payload);

    const res = await registerUser(payload);

    // Optional: update local table if needed
    setEmployees((prev) => [...prev, res]);

    resetForm();
    setEditingEmployee(null);

    toast.update(id, {
      render: "Employee registered successfully!",
      type: "success",
      isLoading: false,
      autoClose: 2000,
    });
  } catch (err) {
    console.error(err);
    toast.update(id, {
      render:
        err.response?.data?.message || "Failed to register employee",
      type: "error",
      isLoading: false,
      autoClose: 2000,
    });
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
        toast.succ("Employee deleted successfully", "success");
      } catch (err) {
        console.error(err);
        toast.error("Delete failed", "error");
      } finally {
        setConfirm({ show: false, message: "", onConfirm: null });
      }
    },
  });
};

const totalPages = Math.ceil(employees.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentEmployees = employees.slice(indexOfFirst, indexOfLast);

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-screen bg-gray-100 p-4 sm:p-6">
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
      {/* ================= FORM ================= */}
      {/* <div className="bg-white rounded-lg shadow-lg w-full min-h-screen p-3 sm:p-6"> */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          {editingEmployee ? "Edit Employee" : "Add Employee"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={{
            firstName: editingEmployee?.first_Name || "",
            lastName: editingEmployee?.last_Name || "",
            email: editingEmployee?.email || "",
            phone: editingEmployee?.phone || "",
            password: "",
            confirmPassword: "",
            department: editingEmployee?.department_name || "",
            role: editingEmployee?.role_name || "",
            citizenId: editingEmployee?.citizenId || "",
            gender: editingEmployee?.gender || "",
            dob: editingEmployee?.dob || "",
            nationality: editingEmployee?.nationality || "",
            employee_type: editingEmployee?.employee_type || "",
            address: editingEmployee?.address || "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ resetForm }) => (
            <Form className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <FieldBlock label="First Name" name="firstName" />
                <FieldBlock label="Last Name" name="lastName" />
              </div>
                <FieldBlock label="Email" name="email" type="email" />

              {!editingEmployee && (
                <div className="flex flex-col sm:flex-row gap-4">
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

              <div className="flex flex-col sm:flex-row gap-4">
                <FieldBlock label="Nationality" name="nationality" />
                <FieldBlock label="Address" name="address" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <SelectBlock label="Gender" name="gender" options={["Male","Female"]} />
                <FieldBlock label="Date of Birth" name="dob" type="date" />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <FieldBlock label="Phone" name="phone" />
                <FieldBlock label="Citizenship" name="citizenId" />
              </div>

              <div className="grid grid-cols-2 gap-4 ">
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
                <SelectBlock label="Employee Type" name="employee_type" options={["Full_time","Part_time","Intern"]} />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
      {/* <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[700px] min-w-0">
        <h2 className="text-2xl font-bold text-center mb-4">
          Employee List
        </h2>

        <div className="overflow-x-auto customs-scrollbar rounded-lg">
          <table className="w-full border border-gray-200 table-auto">
            <thead className="bg-sky-600 text-white text-xs sm:text-sm">
              <tr>
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Address",
                  "Department",
                  "Role"

                ].map((h) => (
                  <th key={h} className="px-4 py-2 text-left ">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
             {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500 italic">
                  <LogoLoading />
                </td>
              </tr>
              ) : currentEmployees.length > 0 ? 
              
              (currentEmployees.map((emp) => (
                 <tr key={emp.id} className="hover:bg-gray-50 text-xs sm:text-sm">
                    <td className="px-4 py-2 truncate">{emp.first_name} {emp.last_name}</td>
                      <td className="px-4 py-2 truncate">{emp.email}</td>
                      <td className="px-4 py-2 truncate">{emp.ph_no}</td>
                      <td className="px-4 py-2 truncate">{emp.address}</td>
                      <td className="px-4 py-2 truncate">{emp.department_id}</td>
                      <td className="px-4 py-2 truncate">{emp.role_id}</td>
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
        <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
      </div> */}

      {/* ================= EMPLOYEE LIST ================= */}
<div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[700px] h-auto md:h-1/3 overflow-hidden">
  <h2 className="text-2xl font-bold text-center mb-4">
    Employee List
  </h2>

  {/* ================= MOBILE GRID ================= */}
   <div className="overflow-x-auto customs-scrollbar rounded-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:hidden">
          <table className="w-full border border-gray-200 table-auto">
            <thead className="bg-sky-600 text-white text-xs sm:text-sm">
              <tr>
                {[
                  "Name",
                  "Email",
                  "Phone",
                  "Address",
                  "Department",
                  "Role"

                ].map((h) => (
                  <th key={h} className="px-4 py-2 text-left ">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
             {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500 italic">
                  <LogoLoading />
                </td>
              </tr>
              ) : currentEmployees.length > 0 ?             (currentEmployees.map((emp) => (
                 <tr key={emp.id} className="hover:bg-gray-50 text-xs sm:text-sm">
                    <td className="px-4 py-2 truncate">{emp.first_name} {emp.last_name}</td>
                      <td className="px-4 py-2 truncate">{emp.email}</td>
                      <td className="px-4 py-2 truncate">{emp.ph_no}</td>
                      <td className="px-4 py-2 truncate">{emp.address}</td>
                      <td className="px-4 py-2 truncate">{emp.department_id}</td>
                      <td className="px-4 py-2 truncate">{emp.role_id}</td>
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

  {/* ================= DESKTOP TABLE ================= */}
  <div className="hidden md:block overflow-x-auto customs-scrollbar rounded-lg">
    <table className="w-full border border-gray-200 table-auto">
      <thead className="bg-sky-600 text-white text-sm">
        <tr>
          {["Name", "Email", "Phone", "Address", "Department", "Role"].map(
            (h) => (
              <th key={h} className="px-4 py-2 text-left">
                {h}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody className="text-sm">
        {loading ? (
          <tr>
            <td colSpan="6" className="text-center py-4">
              <LogoLoading />
            </td>
          </tr>
        ) : currentEmployees.length > 0 ? (
          currentEmployees.map((emp) => (
            <tr key={emp.id} className="hover:bg-gray-50 text-xs sm:text-sm">
                <td className="px-4 py-2 truncate">{emp.first_name} {emp.last_name}</td>
                <td className="px-4 py-2 truncate">{emp.email}</td>
                <td className="px-4 py-2 truncate">{emp.ph_no}</td>
                <td className="px-4 py-2 truncate">{emp.address}</td>
                <td className="px-4 py-2 truncate">{emp.department_id}</td>
                <td className="px-4 py-2 truncate">{emp.role_id}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-4 text-gray-500 italic">
              No employees found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={setCurrentPage}
  />
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
