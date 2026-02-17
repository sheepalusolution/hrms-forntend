import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faTimes, faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ConfirmModal from "../../component/ConfirmModel";
import LogoLoading from "../../component/logoLoading";
import { deleteEmployee, getAllEmployees, updateEmployee } from "../../service/EmployeesService";
import Pagination from "../../component/Pagination";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const toastShown = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");


  const [confirm, setConfirm] = useState({
    show: false,
    message: "",
    onConfirm: null,
  });

  /* ================= FETCH EMPLOYEES ================= */
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await getAllEmployees();
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

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setConfirm({
      show: true,
      message: "Are you sure you want to delete this employee?",
      onConfirm: async () => {
        try {
          await deleteEmployee(id);
          setEmployees(prev => prev.filter(e => e.id !== id));
          toast.success("Employee deleted successfully");
        } catch (err) {
          console.error(err);
          toast.error("Delete failed");
        } finally {
          setConfirm({ show: false, message: "", onConfirm: null });
        }
      },
    });
  };

  /* ================= UPDATE ================= */
  const handleUpdate = async (values) => {
    try {
      const updated = await updateEmployee(values.id, values);
      setEmployees(prev =>
        prev.map(emp => (emp.id === updated.id ? updated : emp))
      );
      toast.success("Employee updated successfully");
      setEditingEmployee(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update employee");
    }
  };

  /* ================= VALIDATION SCHEMA ================= */
  const validationSchema = Yup.object({
    first_name: Yup.string().required("Required"),
    last_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    ph_no: Yup.string().required("Required"),
    dob: Yup.date().required("Required"),
    gender: Yup.string().required("Required"),
    address: Yup.string(),
    nationality: Yup.string(),
    employee_type: Yup.string(),
    status: Yup.string(),
    department_id: Yup.number(),
    role_id: Yup.number(),
  });

  const filteredEmployees = employees.filter(emp => {
  const matchesSearch =
    `${emp.first_name} ${emp.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.ph_no?.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesStatus = statusFilter ? emp.status === statusFilter : true;
  const matchesType = typeFilter ? emp.employee_type === typeFilter : true;
  const matchesDistrict = districtFilter
  ? emp.address?.toLowerCase().includes(districtFilter.toLowerCase())
  : true;


  return matchesSearch && matchesStatus && matchesType && matchesDistrict;
});

const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirst, indexOfLast);

const handleExportCSV = () =>{
  if (filteredEmployees.length === 0) return;

  const headers =[
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Gender",
    "DOB",
    "Address",
    "Nationality",
    "Employee Type",
    "Status",
    "Department",
    "Role",
  ];

  const rows = filteredEmployees.map(emp =>[
    emp.first_name,
    emp.last_name,
    emp.email,
    emp.ph_no,
    emp.gender,
    emp.dob,
    emp.address,
    emp.nationality,
    emp.employee_type,
    emp.status,
    emp.department_id,
    emp.role_id,
  ]);

  const csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows]
      .map(row => row.join(","))
      .join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "employees.csv");
  document.body.appendChild(link);
  link.click();
};


  return (
    <div className="flex flex-col lg:flex-row bg-gray-100 p-6">
      {/* ================= CONFIRM MODAL ================= */}
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

      {/* ================= EMPLOYEE TABLE ================= */}
      <div className="px-6 rounded-lg mx-auto w-full max-w-6xl">
        <h2 className="text-2xl font-bold text-center mb-8">Employee List</h2>

        {/* ================= SEARCH + FILTER ================= */}
        <div className="border-b border-gray-200 pb-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            
            <div className="relative w-full sm:w-auto sm:min-w-[240px] lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400v" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/50 border border-gray-300 rounded pl-9 pr-4 py-2 text-sm outline-none transition"
              />
            </div>

            {/* Status Filter */}
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">

            {/* Status */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm outline-none bg-white min-w-[140px]"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Type */}
            <div className="relative">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm outline-none bg-white min-w-[140px]"
              >
                <option value="">All Types</option>
                <option value="full_time">Full Time</option>
                <option value="intern">Intern</option>
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* District */}
            <div className="relative">
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="appearance-none border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm outline-none bg-white min-w-[140px]"
              >
                <option value="">District</option>
                <option value="kathmandu">Kathmandu</option>
                <option value="lalitpur">Lalitpur</option>
                <option value="bhaktapur">Bhaktapur</option>
              </select>
              <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            {/* Clear */}
            {(searchTerm || statusFilter || typeFilter || districtFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('');
                  setTypeFilter('');
                  setDistrictFilter('');
                }}
                className="text-sm text-sky-600 hover:text-sky-800 font-medium"
              >
                Clear
              </button>
            )}

          </div>
          <button
              onClick={handleExportCSV}
              className="bg-black-900 text-black border border-black px-4 py-2 rounded text-sm font-medium hover:bg-sky-900 hover:text-white"
            >
              Export CSV <FontAwesomeIcon icon={faFileArrowDown} />

            </button>

          </div>
        </div>

        <div className="overflow-x-auto customs-scrollbar rounded">
          <table className="w-full min-w-max border border-gray-200 table-auto">
            <thead className="bg-sky-600 text-white">
              <tr>
                {["Name","Email","Phone","Gender","Date of Birth","Address","Nationality","Employee Type","Status","Department","Role","Action"].map((h) => (
                  <th key={h} className="px-4 py-2 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
              {loading ? (
                <tr>
                  <td colSpan="12" className="text-center py-4 text-gray-500 italic">
                    <LogoLoading />
                  </td>
                </tr>
              ) : currentEmployees.length > 0 ? currentEmployees.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50 text-xs sm:text-sm">
                  <td className="px-4 py-2 truncate">{emp.first_name} {emp.last_name}</td>
                  <td className="px-4 py-2 truncate">{emp.email}</td>
                  <td className="px-4 py-2 truncate">{emp.ph_no}</td>
                  <td className="px-4 py-2 truncate">{emp.gender}</td>
                  <td className="px-4 py-2 truncate">{emp.dob}</td>
                  <td className="px-4 py-2 truncate">{emp.address}</td>
                  <td className="px-4 py-2 truncate">{emp.nationality}</td>
                  <td className="px-4 py-2 truncate">{emp.employee_type}</td>
                  <td className="px-4 py-2 truncate">{emp.status}</td>
                  <td className="px-4 py-2 truncate">{emp.department_id}</td>
                  <td className="px-4 py-2 truncate">{emp.role_id}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button onClick={() => setEditingEmployee(emp)} className="text-blue-600 hover:text-blue-900 transition-colors">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button onClick={() => handleDelete(emp.id)} className="text-red-600 hover:text-red-900 transition-colors">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="12" className="text-center py-4 text-gray-500 italic">No employees found</td>
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

        {/* ================= EDIT MODAL ================= */}
        {editingEmployee && (
          <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/30 ">
        
          <div className="bg-white rounded-xl shadow-2xl py-5 px-10 w-full max-w-lg relative animate-fadeIn">
            <button
              onClick={() => setEditingEmployee(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Edit Employee
            </h2>

            <Formik
              initialValues={editingEmployee}
              validationSchema={validationSchema}
              onSubmit={handleUpdate}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-3">
                  {/* Row: First Name + Last Name */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-0.5">
                        First Name
                      </label>
                      <Field
                        name="first_name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <Field
                        name="last_name"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  {/* Row: Email + Phone */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <Field
                        name="ph_no"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                      <ErrorMessage
                        name="ph_no"
                        component="div"
                        className="text-red-500 text-xs mt-1"
                      />
                    </div>
                  </div>

                  {/* Row: DOB + Gender */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <Field
                        name="dob"
                        type="date"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Gender
                      </label>
                      <Field
                        as="select"
                        name="gender"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </Field>
                    </div>
                  </div>

                  {/* Row: Address + Nationality */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <Field
                        name="address"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nationality
                      </label>
                      <Field
                        name="nationality"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Row: Employee Type + Status */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Employee Type
                      </label>
                      <Field
                        as="select"
                        name="employee_type"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                      >
                        <option value="full_time">Full Time</option>
                        <option value="part_time">Part Time</option>
                      </Field>
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <Field
                        as="select"
                        name="status"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Field>
                    </div>
                  </div>

                  {/* Row: Department ID + Role ID */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department ID
                      </label>
                      <Field
                        name="department_id"
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role ID
                      </label>
                      <Field
                        name="role_id"
                        type="number"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                  </div>

                  {/* Submit button */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-sky-600 hover:bg-sky-800 text-white font-medium px-6 py-2.5 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                    >
                      {isSubmitting ? 'Updating...' : 'Update Employee'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Employees;


