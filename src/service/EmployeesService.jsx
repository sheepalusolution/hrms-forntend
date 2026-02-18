import axios from "axios";

const API_BASE_URL = "https://t4fbgm8z-8000.inc1.devtunnels.ms";

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`, {
      headers: {
        accept: "application/json",
      },
    });
    console.log("Employees fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:");

    if (error.response) {
   
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
     
      console.error("No response received:", error.request);
    } else {
      
      console.error("Request setup error:", error.message);
    }

    throw error; 
  }
};

export const deleteEmployee = async (employeeId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/employees/${employeeId}`, {
      headers: { "Accept": "application/json" },
    });
    return response.data; // returns deleted employee info
  } catch (err) {
    console.error("Axios delete error:", err.response?.data || err.message);
    throw err;
  }
};

export const updateEmployee = async (employeeId, employeeData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/employees/${employeeId}`,
      employeeData,
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );
    return response.data; 
  } catch (error) {
    if (error.response) {
      console.error('Error updating employee:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response from server:', error.request);
      throw new Error('No response from server');
    } else {
      console.error('Error:', error.message);
      throw new Error(error.message);
    }
  }
};