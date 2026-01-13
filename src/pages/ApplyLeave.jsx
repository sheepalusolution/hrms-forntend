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
      reason: "Fever",
      status: "Pending",
    },
    {
      id: 2,
      type: "Casual Leave",
      dates: ["2026-01-05", "2026-01-06"],
      reason: "Personal Work",
      status: "Approved",
    },
  ]);

  const [formData, setFormData] = useState({
    type: "",
    dates: [], // array of selected dates
    reason: "",
  });

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
      <div className="w-full max-w-4xl"> 
      <h1 className="text-2xl font-bold mb-6 text-center">Leave Request</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Submit New Leave</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Leave Type + Reason */}
          <div className="w-full max-w-sm justify-self-center">
            <label className="block mb-1 font-medium">Leave Type</label>
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
            <label className="block mb-1 font-medium">Select Dates</label>
            <Calendar
              onChange={(dates) => {
                const selectedDates = Array.isArray(dates)
                  ? dates.map(formatDate)
                  : [formatDate(dates)];
                setFormData({ ...formData, dates: selectedDates });
              }}
              value={formData.dates.map((d) => new Date(d))}
              selectMultiple={true}
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
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Your Leave Requests</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Dates</th>
                <th className="py-2 px-4">Reason</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map((leave) => (
                <tr key={leave.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{leave.type}</td>
                  <td className="py-2 px-4">{leave.dates.join(", ")}</td>
                  <td className="py-2 px-4">{leave.reason}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
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
    </div>
  );
};

export default ApplyLeave;
