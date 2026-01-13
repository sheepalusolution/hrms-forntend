import { useState } from "react";
import { Link } from "react-router-dom";

const LeaveRequest = () => {
  const timestamp = new Date();
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employee: "John Doe",
      type: "Sick Leave",
      date: "2026-01-15",
      reason: "Fever",
      status: "Pending",
      time: new Date().toISOString().split("T")[0],

    },
    {
      id: 2,
      employee: "Jane Smith",
      type: "Casual Leave",
      date: "2026-01-05",
      reason: "Personal work",
      status: "Approved",
      time: new Date().toISOString().split("T")[0],
    },
  ]);

  const handleStatusChange = (id, status) => {
    setLeaveRequests((prev) =>
      prev.map((leave) =>
        leave.id === id ? { ...leave, status } : leave
      )
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow rounded-xl p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Leave Requests
          </h2>
          {/* <Link
            to="/leave-requests"
            className="text-sm text-blue-600 hover:underline"
          >
            View All
          </Link> */}
        </div>

        {/* Empty State */}
        {leaveRequests.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-6">
            No leave requests available
          </p>
        ) : (
          <div className="space-y-4">
            {leaveRequests.map((leave) => (
              <div
                key={leave.id}
                className="border rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* Info */}
                <div>
                  <p className="font-semibold text-gray-800">
                    {leave.employee}
                  </p>
                  <p className="text-sm text-gray-500">
                    {leave.type} • {leave.reason}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Leave Taken on: {leave.date}
                  </p>
                   <p className="text-xs text-gray-400 mt-1">
                    Date: {leave.time}
                  </p>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col items-end gap-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded self-start ml-auto sm-self-auto
                      ${
                        leave.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : leave.status === "Declined"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {leave.status}
                  </span>

                  {leave.status === "Pending" && (
                    <div className="flex ml-auto gap-2" >
                      <button
                        onClick={() =>
                          handleStatusChange(leave.id, "Approved")
                        }
                        className="px-3 py-1 text-xs bg-green-500 text-white rounded self-start ml-auto sm:self-autohover:bg-green-600 transition"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          handleStatusChange(leave.id, "Declined")
                        }
                        className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition"
                      >
                        Decline
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequest;
