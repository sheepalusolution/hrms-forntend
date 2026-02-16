import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FiUsers, FiFileText, FiDollarSign } from "react-icons/fi";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Dashboard = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   fetch("https://canvasjs.com/data/gallery/react/nifty-stock-price.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const dps = data.map(item => ({
  //         x: new Date(item.x),
  //         y: item.y
  //       }));

  //       setDataPoints(dps);
  //       setIsLoaded(true);
  //     });
  // }, []);

  //   const chartOptions = {
  //   theme: "light2",
  //   title: {
  //     text: "Revenue Trend"
  //   },
  //   axisX: {
  //     valueFormatString: "MMM YYYY"
  //   },
  //   axisY: {
  //     prefix: "Rs",
  //     includeZero: false
  //   },
  //   data: [
  //     {
  //       type: "line",
  //       dataPoints: dataPoints
  //     }
  //   ]
  // };


  return (
     <div className="min-h-screen bg-gray-100 px-15 py-5 top-0">
      {/* Dashboard Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard home</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500">Users</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <FiUsers size={30} className="text-sky-500" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500">Reports</p>
            <p className="text-2xl font-bold">567</p>
          </div>
          <FiFileText size={30} className="text-green-500" />
        </div>

        <div className="bg-white p-6 rounded-lg shadow flex justify-between items-center">
          <div>
            <p className="text-gray-500">Revenue</p>
            <p className="text-2xl font-bold">Rs12,345</p>
          </div>
          <FiDollarSign size={30} className="text-yellow-500" />
        </div>
      </div>

      {/* Recent Users */}
      <div className="bg-white shadow rounded-lg p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-bold mb-4">Recent Users</h2>

        {/* Mobile View - Cards */}
        <div className="space-y-3">
          {[
            { name: "John Doe", email: "john@example.com", role: "Admin" },
            { name: "Jane Smith", email: "jane@example.com", role: "User" },
            { name: "Mark Johnson", email: "mark@example.com", role: "Manager" },
          ].map((user, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex justify-between items-start"
            >
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="text-right">
                 <p className="text-xs text-gray-500 mb-1">Role</p>
                 <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 text-blue-600">
                {user.role}
              </span>
              </div>
             
            </div>
          ))}
        </div>
      </div>    

      {/* Example chart placeholder */}
      {/* <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Revenue Chart</h2>
        {isLoaded ? (
          <CanvasJSChart options={chartOptions} />
        ) : (
          <p className="text-gray-400">Loading chart...</p>
        )}

      </div> */}
      
    </div>
  );
};

export default Dashboard;
