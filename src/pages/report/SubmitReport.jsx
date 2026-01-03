// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { FiFileText, FiPaperclip } from "react-icons/fi";

// const SubmitReport = () => {
//   // Validation schema
//   const ReportSchema = Yup.object().shape({
//     title: Yup.string().required("Report title is required"),
//     description: Yup.string().required("Description is required"),
//     date: Yup.date().required("Date is required"),
//     file: Yup.mixed().required("File is required"),
//   });

//   const handleSubmit = (values, { resetForm }) => {
//     console.log("Submitted Report:", values);
//     alert("Report submitted successfully!");
//     resetForm();
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-15">
//       <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
//         <FiFileText /> Submit Report
//       </h1>

//       <Formik
//         initialValues={{ title: "", description: "", date: "", file: null }}
//         validationSchema={ReportSchema}
//         onSubmit={handleSubmit}
//       >
//         {({ setFieldValue, values }) => (
//           <Form className="bg-white shadow-md rounded-lg p-10 space-y-4 ">

//             {/* Report Title */}
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Report Title</label>
//               <Field
//                 type="text"
//                 name="title"
//                 className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
//               />
//               <ErrorMessage name="title" component="div" className="text-red-600 text-sm mt-1" />
//             </div>

//             {/* File Upload */}
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Upload File</label>
//               <div className="mt-1 relative">
//                 <input 
//                 type="file"
//                 accept=".pdf,.doc,.docx,.xls,.xlsx"
//                 onChange={(event) => setFieldValue("file", event.currentTarget.files[0])}
//                 className="block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 cursor-pointer text-gray-700"
//                 />
//                  <FiPaperclip className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400" size={20} />
//                 <div/>    
//                 {values.file && (
//                   <span className="text-gray-700 text-sm truncate max-w-xs">Selected file: {values.file.name}</span>
//                 )}
//               </div>
//               <ErrorMessage name="file" component="div" className="text-red-600 text-sm mt-1" />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-gray-600">Description</label>
//               <Field
//                 as="textarea"
//                 name="description"
//                 rows="4"
//                 className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
//               />
//               <ErrorMessage name="description" component="div" className="text-red-600 text-sm mt-1" />
//             </div>

//             {/* Date */}
//             {/* <div>
//               <label className="block text-sm font-medium text-gray-600">Date</label>
//               <Field
//                 type="date"
//                 name="date"
//                 className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500"
//               />
//               <ErrorMessage name="date" component="div" className="text-red-600 text-sm mt-1" />
//             </div> */}
//             <div className="relative w-full">
//               <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
//               <div className="flex items-center border rounded-lg bg-gray-50 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-sky-500 focus-within:border-sky-500">
//                 <FiCalendar className="text-gray-400 mr-2" size={18} />
//                 <Field
//                   type="date"
//                   name="date"
//                   className="w-full border-none bg-transparent outline-none text-gray-700 placeholder-gray-400"
//                 />
//                 {values.date && (
//                   <button
//                     type="button"
//                     onClick={() => setFieldValue("date", "")}
//                     className="ml-2 text-gray-400 hover:text-red-500"
//                   >
//                     <FiX size={18} />
//                   </button>
//                 )}
//               </div>
//               <ErrorMessage
//                 name="date"
//                 component="div"
//                 className="text-red-600 text-sm mt-1"
//               />
//             </div>



//             {/* Submit Button */}
//             <div>
//               <button
//                 type="submit"
//                 className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition"
//               >
//                 Submit Report
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default SubmitReport;

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiFileText, FiPaperclip, FiCalendar, FiX } from "react-icons/fi";

const SubmitReport = () => {
  // Validation schema
  const ReportSchema = Yup.object().shape({
    title: Yup.string().required("Report title is required"),
    description: Yup.string().required("Description is required"),
    date: Yup.date().required("Date is required"),
    file: Yup.mixed().required("File is required"),
  });

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
        initialValues={{ title: "", description: "", date: "", file: null }}
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

            {/* Date Picker */}
            <div className="relative w-full">
              <label className="block text-sm font-medium text-gray-600 mb-1">Date</label>
              <div className="flex items-center border rounded-lg bg-gray-50 px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-sky-500 focus-within:border-sky-500">
                <FiCalendar className="text-gray-400 mr-2" size={18} />
                <Field
                  type="date"
                  name="date"
                  className="w-full border-none bg-transparent outline-none text-gray-700 placeholder-gray-400"
                />
                {values.date && (
                  <button
                    type="button"
                    onClick={() => setFieldValue("date", "")}
                    className="ml-2 text-gray-400 hover:text-red-500"
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>
              <ErrorMessage name="date" component="div" className="text-red-600 text-sm mt-1" />
            </div>

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
