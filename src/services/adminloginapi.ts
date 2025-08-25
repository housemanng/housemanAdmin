// import axios from "axios";

// const API_URL = "http://localhost:8080/api/admin"; // Base URL for admin API

// interface LoginFormData {
//   email: string;
//   password: string;
// }

// export const loginAdmin = async (formData: LoginFormData) => {
//   try {
//     const response = await axios.post(`${API_URL}/login`, formData);
//     return response.data; // Return the response data (token and admin details)
//   } catch (error: any) {
//     throw error; // Throw the error to be handled in the component
//   }
// };