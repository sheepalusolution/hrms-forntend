import React, { useState } from "react";
import { FiPlus, FiTrash2, FiSave, FiDollarSign, FiType, FiPercent } from "react-icons/fi";

const SalaryManagement = () => {
  const [salaryComponents, setSalaryComponents] = useState([
    { id: 1, type: "Basic", amount: 0, category: "earning" },
    { id: 2, type: "HRA", amount: 0, category: "allowance" },
    { id: 3, type: "Provident Fund", amount: 0, category: "deduction" },
  ]);

  const componentTypes = [
    { value: "Basic", label: "Basic", category: "earning", icon: <FiDollarSign /> },
    { value: "HRA", label: "Housing Allowance", category: "allowance", icon: <FiDollarSign /> },
    { value: "DA", label: "Dearness Allowance", category: "allowance", icon: <FiDollarSign /> },
    { value: "TA", label: "Travel Allowance", category: "allowance", icon: <FiDollarSign /> },
    { value: "Medical", label: "Medical Allowance", category: "allowance", icon: <FiDollarSign /> },
    { value: "Bonus", label: "Bonus", category: "allowance", icon: <FiDollarSign /> },
    { value: "Provident Fund", label: "Provident Fund", category: "deduction", icon: <FiPercent /> },
    { value: "Tax", label: "Income Tax", category: "deduction", icon: <FiPercent /> },
    { value: "Insurance", label: "Insurance", category: "deduction", icon: <FiPercent /> },
    { value: "Loan", label: "Loan Recovery", category: "deduction", icon: <FiPercent /> },
    { value: "Other", label: "Other", category: "custom", icon: <FiType /> },
  ];

  const addComponent = () => {
    const newId = salaryComponents.length > 0 ? Math.max(...salaryComponents.map(c => c.id)) + 1 : 1;
    setSalaryComponents([...salaryComponents, { id: newId, type: "", amount: 0, category: "custom" }]);
  };

  const removeComponent = (id) => {
    const updated = salaryComponents.filter(component => component.id !== id);
    setSalaryComponents(updated);
  };

  const handleChange = (id, field, value) => {
    const updated = salaryComponents.map(component => {
      if (component.id === id) {
        const updatedComponent = { ...component, [field]: field === "amount" ? Number(value) : value };
        
        // Update category when type changes
        if (field === "type") {
          const typeInfo = componentTypes.find(t => t.value === value);
          if (typeInfo) {
            updatedComponent.category = typeInfo.category;
          }
        }
        return updatedComponent;
      }
      return component;
    });
    setSalaryComponents(updated);
  };

  const calculateTotal = () => {
    const earnings = salaryComponents
      .filter(c => c.category === "earning" || c.category === "allowance")
      .reduce((sum, c) => sum + (c.amount || 0), 0);
    
    const deductions = salaryComponents
      .filter(c => c.category === "deduction")
      .reduce((sum, c) => sum + (c.amount || 0), 0);
    
    return { earnings, deductions, net: earnings - deductions };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totals = calculateTotal();
    console.log("Salary Structure:", salaryComponents);
    console.log("Totals:", totals);
    alert("Salary structure saved successfully!");
  };

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Salary Management</h1>
          <p className="text-gray-600">Configure and manage salary components for your organization</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <h2 className="text-lg font-semibold text-gray-800">Salary Components</h2>
                <p className="text-sm text-gray-600 mt-1">Add and configure salary components</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  {/* Header Row */}
                  <div className="grid grid-cols-12 gap-4 mb-2 px-2">
                    <div className="col-span-5">
                      <label className="text-sm font-medium text-gray-700">Component Type</label>
                    </div>
                    <div className="col-span-5">
                      <label className="text-sm font-medium text-gray-700">Amount (रु)</label>
                    </div>
                    <div className="col-span-2">
                      <label className="text-sm font-medium text-gray-700">Action</label>
                    </div>
                  </div>

                  {/* Components List */}
                  {salaryComponents.map((component) => {
                    const typeInfo = componentTypes.find(t => t.value === component.type);
                    return (
                      <div
                        key={component.id}
                        className="grid grid-cols-12 gap-4 items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className="col-span-5">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                              {typeInfo?.icon || <FiType />}
                            </div>
                            <select
                              value={component.type}
                              onChange={(e) => handleChange(component.id, "type", e.target.value)}
                              className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                              required
                            >
                              <option value="">Select Component</option>
                              {componentTypes.map((type) => (
                                <option key={type.value} value={type.value}>
                                  {type.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-span-5">
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                             रु{/* <FiDollarSign /> */}
                            </div>
                            <input
                              type="number"
                              value={component.amount === 0 ? "" : component.amount}
                              onChange={(e) => handleChange(component.id, "amount",  e.target.value === "" ? "" : Number(e.target.value))}
                              placeholder="0.00"
                              className="block w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-colors"
                              min="0"
                              step="0.01"
                              required
                            />
                          </div>
                        </div>

                        <div className="col-span-2 flex justify-center">
                          <button
                            type="button"
                            onClick={() => removeComponent(component.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            aria-label="Remove component"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>

                        {/* Category Badge */}
                        {component.category && component.type && (
                          <div className="col-span-12 mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium रु{
                              component.category === 'earning' ? 'bg-green-100 text-green-800' :
                              component.category === 'allowance' ? 'bg-blue-100 text-blue-800' :
                              component.category === 'deduction' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {component.category.charAt(0).toUpperCase() + component.category.slice(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={addComponent}
                    className="inline-flex items-center px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <FiPlus className="mr-2 w-4 h-4" />
                    Add New Component
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 border border-transparent rounded-lg text-sm font-medium text-white hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm transition-all duration-200"
                  >
                    <FiSave className="mr-2 w-4 h-4" />
                    Save Structure
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Salary Summary</h3>

              <div className="space-y-6">
                {/* Earnings */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Earnings</h4>
                  <div className="space-y-2">
                    {salaryComponents
                      .filter(c => c.category === "earning" || c.category === "allowance")
                      .map(component => (
                        <div key={component.id} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{component.type}</span>
                          <span className="text-sm font-medium text-gray-800">रु{component.amount.toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Total Earnings</span>
                    <span className="text-sm font-bold text-green-600">रु{totals.earnings.toLocaleString()}</span>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-3">Deductions</h4>
                  <div className="space-y-2">
                    {salaryComponents
                      .filter(c => c.category === "deduction")
                      .map(component => (
                        <div key={component.id} className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{component.type}</span>
                          <span className="text-sm font-medium text-gray-800">रु{component.amount.toLocaleString()}</span>
                        </div>
                      ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
                    <span className="text-sm font-medium text-gray-700">Total Deductions</span>
                    <span className="text-sm font-bold text-red-600">रु{totals.deductions.toLocaleString()}</span>
                  </div>
                </div>

                {/* Net Salary */}
                <div className="pt-6 border-t border-gray-200">
                  <div className="bg-gradient-to-r from-gray-50 to-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="block text-sm font-medium text-gray-700">Net Salary</span>
                        <span className="block text-xs text-gray-500">Take home amount</span>
                      </div>
                      <span className="text-2xl font-bold text-gray-800">
                        रु{totals.net.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="text-xs text-blue-600 font-medium">Components</div>
                      <div className="text-lg font-bold text-gray-800">{salaryComponents.length}</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-3">
                      <div className="text-xs text-green-600 font-medium">Last Updated</div>
                      <div className="text-sm font-medium text-gray-800">Today</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Tips</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Basic salary is mandatory and should be 40-50% of the gross salary</li>
            <li>• Add allowances to customize the compensation structure</li>
            <li>• Deductions are automatically subtracted from total earnings</li>
            <li>• Changes are saved automatically when you click "Save Structure"</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SalaryManagement;