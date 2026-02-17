// import React from "react";

// const ConfirmModal = ({
//   show,
//   title = "Are you sure?",
//   message = "This action cannot be undone.",
//   confirmText = "Confirm",
//   cancelText = "Cancel",
//   onCancel,
//   onConfirm,
// }) => {
//   if (!show) return null;

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center"
//       aria-modal="true"
//       role="dialog"
//       aria-labelledby="confirm-modal-title"
//       aria-describedby="confirm-modal-message"
//     >
//       <div className="bg-sky-600 rounded-lg shadow-md w-80 border border-gray-200 p-5 animate-fadeIn">
//         {/* Title */}
//         <h3
//           id="confirm-modal-title"
//           className="text-lg font-semibold text-white mb-2"
//         >
//           {title}
//         </h3>

//         {/* Message */}
//         <p
//           id="confirm-modal-message"
//           className="text-white mb-4 text-sm"
//         >
//           {message}
//         </p>

//         {/* Buttons */}
//         <div className="flex justify-end gap-5">
//          {/* Confirm (left) */}
//           <button
//             onClick={onConfirm}
//             className="px-4 py-2 rounded bg-gray-100 text-black text-sm  hover:text-sky-900 focus:outline-none transition-colors"
//           >
//             {confirmText}
//           </button>
//           {/* Cancel (right) */}
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 rounded border border-gray-300 text-white text-sm hover:bg-sky-800 hover:text-gray-100 focus:outline-none transition-colors"
//           >
//             {cancelText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ConfirmModal;

import React from "react";

const ConfirmModal = ({
  show,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
}) => {
  if (!show) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onCancel} // Optional: close on backdrop click
        aria-hidden="true"
      />
      
      {/* Modal container */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        aria-modal="true"
        role="dialog"
        aria-labelledby="confirm-modal-title"
        aria-describedby="confirm-modal-message"
      >
        <div className="bg-white rounded-xl shadow-xl w-full max-w-sm border border-gray-200 p-6 animate-fadeIn">
          {/* Title */}
          <h3
            id="confirm-modal-title"
            className="text-lg font-semibold text-gray-900 mb-2"
          >
            {title}
          </h3>

          {/* Message */}
          <p
            id="confirm-modal-message"
            className="text-gray-600 mb-6 text-sm leading-relaxed"
          >
            {message}
          </p>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded border border-gray-300 bg-white text-gray-700 text-sm font-medium hover:bg-gray-50  transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-sky-600 text-white text-sm font-medium hover:bg-sky-800  transition-colors"
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;