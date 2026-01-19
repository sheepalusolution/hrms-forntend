import React, { useState } from "react";
import {
  FiChevronDown,
  FiCoffee,
  FiLogIn,
  FiLogOut,
} from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

const Attendance = () => {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [attendanceList, setAttendanceList] = useState([]);

  const handleClockIn = () => {
    const now = new Date();

    const newEntry = {
      date: now.toLocaleDateString(),
      timeIn: now.toLocaleTimeString(),
      timeOut: null,
    };

    setAttendanceList(prev => [newEntry, ...prev]);
    setIsClockedIn(true);
  };

  const handleClockOut = () => {
    const now = new Date();

    setAttendanceList(prev =>
      prev.map((item, index) =>
        index === 0 ? { ...item, timeOut: now.toLocaleTimeString() } : item
      )
    );

    setIsClockedIn(false);
  };

  const lastClockIn = attendanceList[0]?.timeIn || "--";
  const lastClockOut = attendanceList[0]?.timeOut || "--";

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-8">
      <div className="w-full max-w-md md:max-w-3xl">

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Attendance
        </h1>

        {/* Workplace */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <p className="text-sm font-medium text-gray-600 mb-2">
            Workplace
          </p>

          <div className="flex items-center justify-between border rounded-lg px-3 py-2">
            <div className="flex items-center gap-2">
              <HiOutlineOfficeBuilding className="text-xl text-gray-600" />
              <span className="text-gray-700 font-medium">
                DayOne – 111 Somerset
              </span>
            </div>
            <FiChevronDown className="text-gray-500" />
          </div>
        </div>

        {/* Shift Duration */}
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <p className="text-sm text-gray-500 mb-3">
            Shift duration: <span className="font-medium">8 hours</span>
          </p>

          <div className="grid grid-cols-2 gap-4">

            {/* Clock In */}
            <div className="border rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-gray-400">
                {lastClockIn}
              </p>

              <button
                onClick={handleClockIn}
                disabled={isClockedIn}
                className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg
                  ${isClockedIn
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-green-500 text-white hover:bg-green-600"}`}
              >
                <FiLogIn />
                Clock In
              </button>
            </div>

            {/* Clock Out */}
            <div className="border rounded-lg p-4 text-center">
              <p className="text-2xl font-semibold text-gray-900">
                {lastClockOut === "--" ? "Present" : lastClockOut}
              </p>

              <button
                onClick={handleClockOut}
                disabled={!isClockedIn}
                className={`mt-3 w-full flex items-center justify-center gap-2 py-2 rounded-lg
                  ${!isClockedIn
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-slate-800 text-white hover:bg-slate-900"}`}
              >
                <FiLogOut />
                Clock Out
              </button>
            </div>

          </div>
        </div>

        {/* Start Break */}
        <button
          disabled={!isClockedIn}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl shadow transition
            ${isClockedIn
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"}`}
        >
          <FiCoffee className="text-lg" />
          Start Break
        </button>

      </div>
    </div>
  );
};

export default Attendance;
