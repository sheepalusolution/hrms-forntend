import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { FiUsers, FiFileText, FiDollarSign } from "react-icons/fi";
import CanvasJSReact from '@canvasjs/react-charts';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Dashboard = () => {
  const [dataPoints, setDataPoints] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetch("https://canvasjs.com/data/gallery/react/nifty-stock-price.json")
      .then((res) => res.json())
      .then((data) => {
        const dps = data.map(item => ({
          x: new Date(item.x),
          y: item.y
        }));

        setDataPoints(dps);
        setIsLoaded(true);
      });
  }, []);

    const chartOptions = {
    theme: "light2",
    title: {
      text: "Revenue Trend"
    },
    axisX: {
      valueFormatString: "MMM YYYY"
    },
    axisY: {
      prefix: "Rs",
      includeZero: false
    },
    data: [
      {
        type: "line",
        dataPoints: dataPoints
      }
    ]
  };


  return (
     <div className="min-h-screen bg-gray-100 px-15 py-5">
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

      {/* Recent Users Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Recent Users</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4 text-gray-600">Name</th>
              <th className="py-2 px-4 text-gray-600">Email</th>
              <th className="py-2 px-4 text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">john@example.com</td>
              <td className="py-2 px-4">Admin</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">Jane Smith</td>
              <td className="py-2 px-4">jane@example.com</td>
              <td className="py-2 px-4">User</td>
            </tr>
            <tr className="border-b hover:bg-gray-50">
              <td className="py-2 px-4">Mark Johnson</td>
              <td className="py-2 px-4">mark@example.com</td>
              <td className="py-2 px-4">Manager</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Example chart placeholder */}
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h2 className="text-xl font-bold mb-4">Revenue Chart</h2>
        {/* <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">
          Chart Placeholder
        </div> */}
        {isLoaded ? (
          <CanvasJSChart options={chartOptions} />
        ) : (
          <p className="text-gray-400">Loading chart...</p>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
