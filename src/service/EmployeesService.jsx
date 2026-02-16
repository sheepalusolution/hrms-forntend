// import axios from "axios";

// const API_BASE_URL = "https://t4fbgm8z-8000.inc1.devtunnels.ms/employee";

// export const getAllEmployees = async () => {
//   try {
//     const response = await axios.get(
//       `${API_BASE_URL}/employees/`,
//       {
//         headers: {
//           accept: "application/json",
//         },
//       }
//     );
//     console.log("Raw employees response:", response.data); 
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching employees:", error);
//     throw error;
//   }
// };

// EmployeesService.js
import axios from "axios";

const API_BASE_URL = "https://t4fbgm8z-8000.inc1.devtunnels.ms";

export const getAllEmployees = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/employees`, {
      headers: {
        accept: "application/json",
      },
    });
    console.log("✅ Employees fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching employees:");

    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
      console.error("Headers:", error.response.headers);
    } else if (error.request) {
      // Request was made but no response
      console.error("No response received:", error.request);
    } else {
      // Something happened setting up the request
      console.error("Request setup error:", error.message);
    }

    throw error; // re-throw so the caller can handle it
  }
};
