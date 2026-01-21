import Calendar from "react-calendar";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiFileText, FiPaperclip, FiCalendar, FiX } from "react-icons/fi";

const SubmitReport = () => {
  // Validation schema
  const ReportSchema = Yup.object().shape({
    title: Yup.string().required("Report title is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.array()
      .min(1, "Please select at least one date")
      .required("Date is required"),
    file: Yup.mixed().required("File is required"),
  });

  const formatDate = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();
  return `${year}-${month}-${day}`;
};


  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitted Report:", values);
    alert("Report submitted successfully!");
    resetForm();
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FiFileText /> Submit Report
      </h1>

      <Formik
        initialValues={{ title: "", description: "", dates: [], file: null }}
        validationSchema={ReportSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => (
          <Form className="bg-white shadow-md rounded-lg p-8 space-y-5">

            {/* Report Title */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Report Title</label>
              <Field
                type="text"
                name="title"
                placeholder="Enter report title"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
              <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Upload File</label>
              <div className="mt-1 relative">
                <input 
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={(event) => setFieldValue("file", event.currentTarget.files[0])}
                  className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 cursor-pointer text-gray-700"
                />
                <FiPaperclip className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                {values.file && (
                  <span className="text-gray-700 text-sm truncate max-w-xs block mt-1">Selected file: {values.file.name}</span>
                )}
              
              <ErrorMessage name="file" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-600">Description</label>
              <Field
                as="textarea"
                name="description"
                rows="4"
                placeholder="Enter description"
                className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
              />
              <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-1" />
            </div>

            {/* Calendar Date Picker */}
            {/* <div className="w-full">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Select Date(s)
              </label>

              <Calendar
                onClickDay={(date) => {
                  const formatted = formatDate(date);

                  // Toggle date selection
                  const updatedDates = values.dates.includes(formatted)
                    ? values.dates.filter(d => d !== formatted)
                    : [...values.dates, formatted];

                  setFieldValue("dates", updatedDates);
                }}
              />

              {values.dates.length > 0 && (
                <p className="text-sm text-gray-700 mt-2">
                  Selected: {values.dates.join(", ")}
                </p>
              )}

              <ErrorMessage
                name="dates"
                component="div"
                className="text-red-600 text-sm mt-1"
              />
            </div> */}


            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition font-medium"
              >
                Submit Report
              </button>
            </div>

          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SubmitReport;
