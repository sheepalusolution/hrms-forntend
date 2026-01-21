import React, { useState } from "react";
import { 
  FiCheck, 
  FiLock, 
  FiRefreshCw, 
  FiPlus, 
  FiCalendar,
  FiUser,
  FiDollarSign,
  FiChevronRight,
  FiDownload,
  FiSend,
  FiAlertCircle
} from "react-icons/fi";

const PayrollProcessing = () => {
  const [payrollPeriod, setPayrollPeriod] = useState("");
  const [payrollDate, setPayrollDate] = useState(null);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [adjustments, setAdjustments] = useState([
    { id: 1, employeeId: "EMP001", name: "John Doe", amount: 0, reason: "" },
    { id: 2, employeeId: "EMP002", name: "Jane Smith", amount: 0, reason: "" },
  ]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));

  const handleGenerate = () => {
    if (!payrollPeriod) {
      alert("Please select a payroll period!");
      return;
    }
    // Simulate payroll generation
    setIsGenerated(true);
    alert(`Payroll for ${payrollPeriod} generated successfully!`);
  };

  const handleApprove = () => {
    setIsApproved(true);
    alert(`Payroll for ${payrollPeriod} approved and locked!`);
  };

  const handleAdjustmentChange = (id, field, value) => {
    const updated = adjustments.map(adj => 
      adj.id === id ? { ...adj, [field]: value } : adj
    );
    setAdjustments(updated);
  };

  const addAdjustment = () => {
    const newId = adjustments.length > 0 ? Math.max(...adjustments.map(a => a.id)) + 1 : 1;
    setAdjustments([
      ...adjustments, 
      { id: newId, employeeId: "", name: "", amount: 0, reason: "" }
    ]);
  };

  const removeAdjustment = (id) => {
    setAdjustments(adjustments.filter(adj => adj.id !== id));
  };

  const calculateTotalAdjustments = () => {
    return adjustments.reduce((sum, adj) => sum + (Number(adj.amount) || 0), 0);
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl flex justify-center font-bold text-gray-800">Payroll Processing</h1>
              <p className="text-gray-600 mt-2">Process, review, and approve monthly payroll</p>
            </div>
          </div>
          <div className="flex justify-center md:justify-end items-end gap-2 mt-2 text-sm text-gray-500 w-full">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                Active Period: {months[new Date().getMonth()]} {currentYear}
              </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Payroll Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Period Selection Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-white">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FiCalendar className="text-blue-500" />
                  Select Payroll Period
                </h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payroll Month
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="month"
                        value={payrollPeriod}
                        onChange={(e) => setPayrollPeriod(e.target.value)}
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      Select the month for which you want to process payroll
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Processing Status
                    </label>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${isGenerated ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                      <span className="font-medium">
                        {isGenerated ? 'Generated' : 'Pending'}
                      </span>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={handleGenerate}
                        disabled={!payrollPeriod}
                        className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${
                          !payrollPeriod 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                        }`}
                      >
                        <FiRefreshCw />
                        Generate Payroll
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                {payrollPeriod && (
                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="text-xs text-blue-600 font-medium">Employees</div>
                        <div className="text-xl font-bold text-gray-800">24</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-xs text-green-600 font-medium">Total Payroll</div>
                        <div className="text-xl font-bold text-gray-800">$85,420</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="text-xs text-purple-600 font-medium">Taxes</div>
                        <div className="text-xl font-bold text-gray-800">$12,810</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Manual Adjustments Card */}
            {isGenerated && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-orange-50 to-white">
                  <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FiDollarSign className="text-orange-500" />
                    Manual Adjustments
                    <span className="ml-2 text-sm font-normal text-gray-600">
                      ({adjustments.length} adjustments)
                    </span>
                  </h2>
                </div>

                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Employee</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Amount</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Reason</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {adjustments.map((adj) => (
                          <tr key={adj.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                  <FiUser className="text-blue-600" />
                                </div>
                                <div>
                                  <div className="font-medium text-gray-800">{adj.name || "Unnamed"}</div>
                                  <div className="text-xs text-gray-500">{adj.employeeId}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                  <span className="text-gray-500">$</span>
                                </div>
                                <input
                                  type="number"
                                  value={adj.amount}
                                  onChange={(e) => handleAdjustmentChange(adj.id, "amount", e.target.value)}
                                  className="pl-8 w-32 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                  placeholder="0.00"
                                />
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <input
                                type="text"
                                value={adj.reason}
                                onChange={(e) => handleAdjustmentChange(adj.id, "reason", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Bonus, Deduction, etc."
                              />
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => removeAdjustment(adj.id)}
                                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={addAdjustment}
                      className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <FiPlus />
                      Add New Adjustment
                    </button>
                    
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Total Adjustments</div>
                      <div className="text-lg font-bold text-gray-800">
                        ${calculateTotalAdjustments().toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {isGenerated && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={handleApprove}
                    disabled={isApproved}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
                      isApproved
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                    }`}
                  >
                    <FiLock />
                    {isApproved ? 'Approved & Locked' : 'Approve & Lock Payroll'}
                  </button>
                  
                  <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <FiDownload />
                    Export Payroll Report
                  </button>
                  
                  <button className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors">
                    <FiSend />
                    Send to Accountant
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Status & Timeline */}
          <div className="space-y-6">
            {/* Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Processing Status</h3>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${
                  payrollPeriod 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">Period Selected</span>
                    {payrollPeriod && <FiCheck className="text-green-500" />}
                  </div>
                  <div className="text-sm text-gray-600">
                    {payrollPeriod || "Not selected"}
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  isGenerated 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">Payroll Generated</span>
                    {isGenerated && <FiCheck className="text-green-500" />}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isGenerated ? "Ready for review" : "Pending generation"}
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${
                  isApproved 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-700">Approval Status</span>
                    {isApproved && <FiLock className="text-green-500" />}
                  </div>
                  <div className="text-sm text-gray-600">
                    {isApproved ? "Locked and finalized" : "Awaiting approval"}
                  </div>
                </div>
              </div>

              {isApproved && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div className="flex items-start gap-3">
                    <FiCheck className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-green-800">Payroll Approved!</h4>
                      <p className="text-sm text-green-700 mt-1">
                        Payroll for {payrollPeriod} has been approved and locked. No further changes can be made.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Timeline Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Processing Timeline</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-medium text-sm">1</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Select Period</div>
                    <div className="text-sm text-gray-600 mt-1">Choose the payroll month</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isGenerated ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`font-medium text-sm ${
                      isGenerated ? 'text-green-600' : 'text-gray-400'
                    }`}>2</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Generate Payroll</div>
                    <div className="text-sm text-gray-600 mt-1">Calculate salaries and deductions</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isGenerated ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <span className={`font-medium text-sm ${
                      isGenerated ? 'text-blue-600' : 'text-gray-400'
                    }`}>3</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Review & Adjust</div>
                    <div className="text-sm text-gray-600 mt-1">Make manual adjustments if needed</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isApproved ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <span className={`font-medium text-sm ${
                      isApproved ? 'text-green-600' : 'text-gray-400'
                    }`}>4</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">Approve & Lock</div>
                    <div className="text-sm text-gray-600 mt-1">Finalize and secure the payroll</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Card */}
            <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">Important Notes</h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-start gap-2">
                      <FiChevronRight className="mt-0.5 flex-shrink-0" />
                      Payroll can only be approved once per period
                    </li>
                    <li className="flex items-start gap-2">
                      <FiChevronRight className="mt-0.5 flex-shrink-0" />
                      After approval, payroll becomes read-only
                    </li>
                    <li className="flex items-start gap-2">
                      <FiChevronRight className="mt-0.5 flex-shrink-0" />
                      Always review adjustments before approval
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollProcessing;