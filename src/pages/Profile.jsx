// import React, { useState } from "react";
// import { FiEdit, FiMail, FiPhone, FiUser } from "react-icons/fi";
// import * as Yup from "yup";

// const ProfileSchema = Yup.object({
//   name: Yup.string().required("Name is required"),
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   phone: Yup.string()
//     .matches(/^[0-9+]{10,15}$/, "Invalid phone number")
//     .required("Phone is required"),
// });

// const Profile = () => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [errors, setErrors] = useState({});

//   const [profile, setProfile] = useState({
//     name: "John Doe",
//     role: "HR Manager",
//     email: "john.doe@hrms.com",
//     phone: "+9779812345678",
//     department: "Human Resources",
//   });

//   const handleChange = (e) => {
//     setProfile({ ...profile, [e.target.name]: e.target.value });
//   };

//   const handleSave = async () => {
//     try {
//       // ✅ Validate using Yup
//       await ProfileSchema.validate(profile, { abortEarly: false });

//       // ✅ Clear errors
//       setErrors({});
//       setIsEditing(false);

//       // 🔗 API CALL HERE
//       console.log("Saved Profile:", profile);

//     } catch (validationError) {
//       const tempErrors = {};
//       validationError.inner.forEach((err) => {
//         tempErrors[err.path] = err.message;
//       });
//       setErrors(tempErrors);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       {/* Header */}
//       <div className="relative mb-6">
//         <h1 className="text-2xl text-center font-bold text-gray-800">My Profile</h1>

//         <button
//           onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
//           className="absolute right-0 top-1/2 transform -translate-y-1/2 flex items-center text-lg text-sky-600 hover:text-sky-700"
//         >
//           <FiEdit />
//           {isEditing ? "Save" : "Edit"}
//         </button>
//       </div>

//       {/* Profile Card */}
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <div className="flex flex-col md:flex-row gap-8">

//           {/* Avatar */}
//           <div className="flex flex-col items-center md:w-1/4">
//             <div className="w-28 h-28 border-6 border-black-200 bg-white-200 rounded-full flex items-center justify-center text-lg font-bold text-sky-600">
//               <FiUser size={80}/>
//             </div>
//             <p className="mt-3 text-sm text-gray-500">Profile Picture</p>
//              <p className="mt-3 text-lg font-bold text-sky-600">{profile.name}</p>
//           </div>

//           {/* Details */}
//           <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">

//             {/* Name */}
//             <div>
//               <label className="text-sm text-gray-500">Full Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={profile.name}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 disabled:bg-gray-100"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//               )}
//             </div>

//             {/* Role */}
//             <div>
//               <label className="text-sm text-gray-500">Role</label>
//               <input
//                 type="text"
//                 value={profile.role}
//                 disabled
//                 className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100"
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm text-gray-500 flex items-center gap-1">
//                 <FiMail /> Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={profile.email}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 disabled:bg-gray-100"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//               )}
//             </div>

//             {/* Phone */}
//             <div>
//               <label className="text-sm text-gray-500 flex items-center gap-1">
//                 <FiPhone /> Phone
//               </label>
//               <input
//                 type="text"
//                 name="phone"
//                 value={profile.phone}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 disabled:bg-gray-100"
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
//               )}
//             </div>

//             {/* Department */}
//             <div className="md:col-span-2">
//               <label className="text-sm text-gray-500">Department</label>
//               <input
//                 type="text"
//                 name="department"
//                 value={profile.department}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 disabled:bg-gray-100"
//               />
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState } from "react";
import { FiEdit, FiMail, FiPhone, FiUser } from "react-icons/fi";
import { FaRegBuilding } from "react-icons/fa";
import { MdPermIdentity } from "react-icons/md";
import * as Yup from "yup";

// Validation schema
const ProfileSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9+]{10,15}$/, "Invalid phone number")
    .required("Phone is required"),
});

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});

  // Original profile to revert on discard
  const [originalProfile, setOriginalProfile] = useState({
    name: "John Doe",
    role: "HR Manager",
    email: "john.doe@hrms.com",
    phone: "+9779812345678",
    CitizenshipNo: "19-92-23910",
    department: "Human Resources",
  });

  const [profile, setProfile] = useState({ ...originalProfile });

  // Update profile state on input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Save changes
  const handleSave = async () => {
    try {
      await ProfileSchema.validate(profile, { abortEarly: false });
      setErrors({});
      setIsEditing(false);
      setOriginalProfile({ ...profile }); // Update originalProfile after saving
      console.log("Saved Profile:", profile);
    } catch (validationError) {
      const tempErrors = {};
      validationError.inner.forEach((err) => {
        tempErrors[err.path] = err.message;
      });
      setErrors(tempErrors);
    }
  };

  // Discard changes
  const handleDiscard = () => {
    setProfile({ ...originalProfile }); // Revert to original
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <div className="relative mb-6">
        <h1 className="text-2xl text-center font-bold text-gray-800">My Profile</h1>

        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex gap-2">
          {!isEditing &&(
            
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-lg text-sky-600 hover:text-sky-700"
            >
              <FiEdit /> Edit
            </button>
          )}
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-lg p-19 ">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Avatar */}
          <div className="flex flex-col items-center md:w-1/4">
            <div className="w-28 h-28 border-6 border-sky-600 bg-white-100 rounded-full flex items-center justify-center text-lg font-bold text-sky-600">
              <FiUser size={80} />
            </div>
            <p className="mt-3 text-2xl font-bold text-sky-600">{profile.name}</p>
             <p className="text-base font-semibold text-sky-600">{profile.email}</p>
            <p className="text-sm font-semibold text-sky-600">{profile.role}</p>
          </div>

          {/* Details */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="text-sm text-gray-500">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 disabled:bg-gray-100"
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="text-sm text-gray-500">Role</label>
              <input
                type="text"
                value={profile.role}
                disabled
                className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-500 flex items-center gap-1">
                <FiMail /> Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 disabled:bg-gray-100"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm text-gray-500 flex items-center gap-1">
                <FiPhone /> Phone
              </label>
              <input
                type="text"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 disabled:bg-gray-100"
              />
              {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
            </div>

            {/* Citizenship */}
            <div>
              <label className="text-sm text-gray-500 flex items-center gap-1">
                <MdPermIdentity /> Citizenship No.
              </label>
              <input
                type="text"
                name="citizenship"
                value={profile.CitizenshipNo}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 disabled:bg-gray-100"
              />
              {errors.CitizenshipNo && <p className="text-red-500 text-xs mt-1">{errors.CitizenshipNo}</p>}
            </div>

            {/* Department */}
            <div>
              <label className="text-sm text-gray-500 flex items-center gap-1"><FaRegBuilding/>Department</label>
              <input
                type="text"
                name="department"
                value={profile.department}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-1 focus:ring-sky-500 disabled:bg-gray-100"
              />
            </div>
          </div>
        </div>
      </div>
      {isEditing &&(
         <div className="flex justify-end gap-2 mt-4 md:col-span-2">
            <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 w-30 bg-sky-600 text-white rounded hover:bg-sky-800 transition-colors"
            >
             Save
            </button>
            <button
                type="button"
                onClick={handleDiscard}
                className="px-4 py-2 w-30 rounded border-1 border-black/10 text-black hover:bg-gray-800 hover:text-white hover:border-white transition-colors"
            >
             Discard
            </button>
          </div>
        )}
    </div>
  );
};

export default Profile;
