import React, { useState } from "react";
import { FiSend, FiCheck, FiX } from "react-icons/fi";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // default styling


const LeaveRequest = () => {

const [value, setValue] = useState(new Date());

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      type: "Sick Leave",
      from: "2026-01-15",
      to: "2026-01-17",
      reason: "Fever",
      status: "Pending",
    },
    {
      id: 2,
      type: "Casual Leave",
      from: "2026-01-05",
      to: "2026-01-06",
      reason: "Personal Work",
      status: "Approved",
    },
  ]);

  const [formData, setFormData] = useState({
    type: "",
    from: "",
    to: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRequest = {
      id: leaveRequests.length + 1,
      ...formData,
      status: "Pending",
    };
    setLeaveRequests([newRequest, ...leaveRequests]);
    setFormData({ type: "", from: "", to: "", reason: "" });
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Leave Request</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Submit New Leave</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block mb-1 font-medium">From Date</label>
                <Calendar
                onChange={(date) => setFormData({ ...formData, from: date.toISOString().split('T')[0] })}
                value={formData.from ? new Date(formData.from) : new Date()}
                />
            </div>

            <div>
                <label className="block mb-1 font-medium">To Date</label>
                <Calendar
                onChange={(date) => setFormData({ ...formData, to: date.toISOString().split('T')[0] })}
                value={formData.to ? new Date(formData.to) : new Date()}
                />
            </div>
          </div>


          <div className="md:col-span-2">
            <label className="block mb-1 font-medium">Reason</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows="3"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              required
            ></textarea>
          </div>

          <div className="md:col-span-2 text-right">
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
                <th className="py-2 px-4">From</th>
                <th className="py-2 px-4">To</th>
                <th className="py-2 px-4">Reason</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {leaveRequests.map((leave) => (
                <tr key={leave.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">{leave.type}</td>
                  <td className="py-2 px-4">{leave.from}</td>
                  <td className="py-2 px-4">{leave.to}</td>
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
  );
};

export default LeaveRequest;
