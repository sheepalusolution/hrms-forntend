import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ApplyLeave = () => {
  // Helper function to format date in local time (YYYY-MM-DD)
  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      type: "Sick Leave",
      dates: ["2026-01-15"],
      duration:"",
      reason: "Fever",
      status: "Pending",
    },
    {
      id: 2,
      type: "Casual Leave",
      dates: ["2026-01-05", "2026-01-06"],
      duration:"",
      reason: "Personal Work",
      status: "Approved",
    },
  ]);

  const [formData, setFormData] = useState({
    type: "",
    dates: [], // array of selected dates
    reason: "",
  });
  const formatDateRange = (dates) => {
  if (!dates || dates.length === 0) return "";
  const sorted = dates.sort(); // ensure dates are in order
  if (sorted.length === 1) return sorted[0];
  return `${sorted[0]} to ${sorted[sorted.length - 1]}`;
};


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.dates.length === 0) {
      alert("Please select at least one date.");
      return;
    }

    const newRequest = {
      id: leaveRequests.length + 1,
      ...formData,
      status: "Pending",
    };

    setLeaveRequests([newRequest, ...leaveRequests]);
    setFormData({ type: "", dates: [], reason: "" });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center item-center">
      <div className="w-full max-w-5xl"> 
      <h1 className="text-2xl font-bold mb-6 text-center">Leave Request</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Submit New Leave</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Leave Type + Reason */}
          <div className="w-full max-w-sm justify-self-center">
            <label className="block mb-1 font-medium">Leave Type</label>
            <div className="flex flex-col space-y-4">
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            >
              <option value="">Select Leave Type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            >
              <option value="">Select Duration Type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Half Leave</option>
            </select>
            </div>

            <label className="block mt-6 mb-1 font-medium">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="6"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            ></textarea>
          </div>

          {/* Calendar */}
          <div className="w-full max-w-sm justify-self-center">
            <label className="block mb-1 font-medium">Select Mode</label>
              <select
                name="selectionMode"
                value={formData.selectionMode || "single"}
                onChange={(e) =>
                  setFormData({ ...formData, selectionMode: e.target.value, dates: [] })
                }
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500 mb-2"
              >
                <option value="single">Single Date</option>
                <option value="multiple">Multiple Dates</option>
              </select>
            <label className="block mb-1 font-medium">Select Dates</label>
            <Calendar
              onChange={(date) => {
                if (formData.selectionMode === "multiple") {
                  // Toggle selected dates
                  const newDates = Array.isArray(formData.dates) ? [...formData.dates] : [];
                  const formatted = formatDate(date);

                  if (newDates.includes(formatted)) {
                    // remove if already selected
                    setFormData({
                      ...formData,
                      dates: newDates.filter((d) => d !== formatted),
                    });
                  } else {
                    setFormData({ ...formData, dates: [...newDates, formatted] });
                  }
                } else {
                  // Single date
                  setFormData({ ...formData, dates: [formatDate(date)] });
                }
              }}
              value={formData.dates.map((d) => new Date(d))}
            />

          </div>

          {/* Submit Button (aligned left) */}
          <div className="md:col-span-2 justify-self-start">
            <button
              type="submit"
              className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 flex items-center gap-2"
            >
              <FiSend /> Submit
            </button>
          </div>
        </form>

      </div>

      {/* Leave Requests Table */}
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
        <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
        <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
        <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
        <th className="px-2 sm:px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {leaveRequests.map((leave) => (
        <tr key={leave.id} className="hover:bg-gray-50">
          <td className="px-2 sm:px-4 py-2">{leave.type}</td>
          <td className="px-2 sm:px-4 py-2">{leave.duration}</td>
          <td className="px-2 sm:px-4 py-2">{formatDateRange(leave.dates)}</td>
          <td className="px-2 sm:px-4 py-2">{leave.reason}</td>
          <td className="px-2 sm:px-4 py-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              leave.status === "Approved"
                ? "bg-green-100 text-green-700"
                : leave.status === "Rejected"
                ? "bg-red-100 text-red-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {leave.status}
            </span>
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

export default ApplyLeave;
