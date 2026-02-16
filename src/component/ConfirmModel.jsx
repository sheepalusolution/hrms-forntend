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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-message"
    >
      <div className="bg-sky-600 rounded-lg shadow-md w-80 border border-gray-200 p-5 animate-fadeIn">
        {/* Title */}
        <h3
          id="confirm-modal-title"
          className="text-lg font-semibold text-white mb-2"
        >
          {title}
        </h3>

        {/* Message */}
        <p
          id="confirm-modal-message"
          className="text-white mb-4 text-sm"
        >
          {message}
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-5">
         {/* Confirm (left) */}
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-gray-100 text-black text-sm  hover:text-sky-900 focus:outline-none transition-colors"
          >
            {confirmText}
          </button>
          {/* Cancel (right) */}
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300 text-white text-sm hover:bg-sky-800 hover:text-gray-100 focus:outline-none transition-colors"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

