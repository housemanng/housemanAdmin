import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/apiConfig";
// import "../Pages.css";
// import "../Responsive.css";
import { FiLock } from "react-icons/fi";
import { FiPhone } from "react-icons/fi";
import { FiLoader } from "react-icons/fi"; // Importing the spinner icon


const AdminLogin = () => {
  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const navigate = useNavigate(); // For navigation

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError(""); // Clear previous errors

    try {
      // Call the admin login API
      const response = await api.post(`/admin/login`, formData);

      // Save token and admin data to localStorage
      localStorage.setItem("adminToken", response.data.token); // Save token
      localStorage.setItem("admin", JSON.stringify(response.data.admin)); // Save admin data



 // Save the current timestamp as lastSeen in localStorage
      // const currentTime = new Date().toISOString(); // Get current time in ISO format
      // localStorage.setItem("lastSeen", currentTime); // Save lastSeen time




      // Redirect to admin dashboard
      navigate("/adminDashboard");
    } catch (err: any) {
      // Handle errors
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your phone number and password."
      );
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div>
   
      <div className="Auth-container-Wrappper">
        <div>
          <div className="Auth-container-Tittle-Wrapper">
            <div className="Auth-container-Tittle-Wrapper-Heading">
              Admin Login
            </div>
            <div className="Auth-container-Tittle-Wrapper-Sub">
              Access Your Admin Dashboard and Manage the System
            </div>
          </div>

          {/* Display error message */}
          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          <div className="Auth-container-Wrappper1">
            <form onSubmit={handleSubmit}>
              {/* Phone Number Input */}
              <div className="Auth-container">
                <div className="Auth-Icon">
                  <FiPhone className="Auth-Icon-Img" />
                </div>
                <input
                  type="text"
                  name="phone_number"
                  placeholder="Phone Number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  required
                  className="Auth-Inp"
                />
              </div>

              {/* Password Input */}
              <div className="Auth-container">
                <div className="Auth-Icon">
                  <FiLock className="Auth-Icon-Img" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="Auth-Inp"
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={isLoading}
                type="submit"
                className="Auth-Inp-Btb"
              >
                {isLoading ? <FiLoader className="spinner" /> : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
