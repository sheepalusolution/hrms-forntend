import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";

const AddEmployee = () => {
  const [employees, setEmployees] = useState([]);

  // Validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
      .required("Phone is required"),
    department: Yup.string().required("Department is required"),
    role: Yup.string().required("Role is required"),
  });

  // Submit handler
  const handleSubmit = (values, { resetForm }) => {
    setEmployees((prev) => [...prev, values]);
    resetForm();
    alert("Employee Added Successfully!");
  };

  return (
    <div className="flex flex-col lg:flex-row items-start justify-center bg-gray-100 p-4 gap-6 ">
      
      {/* ================= Add Employee Form ================= */}
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full lg:max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Employee
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            department: "",
            role: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, resetForm }) => (
            <Form className="space-y-4">
              
              {/* Name */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Name
                </label>
                <Field
                  name="name"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.name && touched.name
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.email && touched.email
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Phone
                </label>
                <Field
                  name="phone"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.phone && touched.phone
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Department */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Department
                </label>
                <Field
                  as="select"
                  name="department"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.department && touched.department
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Department</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                </Field>
                <ErrorMessage
                  name="department"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Role
                </label>
                <Field
                  as="select"
                  name="role"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                    errors.role && touched.role
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                </Field>
                <ErrorMessage
                  name="role"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-800 transition"
                >
                  Add Employee
                </button>

                <button
                  type="button"
                  onClick={() => resetForm()}
                  className="w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-800 hover:text-white transition"
                >
                  Discard
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {/* ================= Employee List ================= */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Employee List
        </h2>

        {employees.length === 0 ? (
          <p className="text-gray-500 text-center">
            No employees added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-[700px] w-full table-fixed">
              <thead className="bg-sky-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left rounded-tl-lg">
                    Name
                  </th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Phone</th>
                  <th className="px-4 py-2 text-left">Department</th>
                  <th className="px-4 py-2 text-left rounded-tr-lg">
                    Role
                  </th>
                </tr>
              </thead>

              <tbody>
                {employees.map((emp, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 text-xs sm:text-sm"
                  >
                    <td className="px-4 py-2 text-xs">{emp.name}</td>
                    <td className="px-4 py-2 text-xs">{emp.email}</td>
                    <td className="px-4 py-2 text-xs">{emp.phone}</td>
                    <td className="px-4 py-2 text-xs">{emp.department}</td>
                    <td className="px-4 py-2 text-xs">{emp.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEmployee;
