import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import axios from "axios";


// Extend Window interface to include custom properties
declare global {
  interface Window {
    refreshTransactionAmounts: () => void;
  }
}

;

import "../../../frontend/src/pages/Pages.css";


// import AdminStats from "../components/AdminStats";

// import ReviewStats from "../components/Charts/ReviewStats";

const AdminDashboard = () => {
  
  const navigate = useNavigate();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  
  
  
 

  useEffect(() => {
    // Retrieve token and admin data from localStorage
    const token = localStorage.getItem("adminToken");
    const admin = JSON.parse(localStorage.getItem("admin") || "{}");

    if (token && admin) {
      setIsSuperAdmin(admin.isSuperAdmin);

      
      
    } else {
      // If no admin data is found, redirect to the login page
      navigate("/adminlogin");
    }
  }, [navigate]);



  // Add check for admin token and ID
  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const admin = JSON.parse(localStorage.getItem("admin") || "{}");

    //
  }, []);


 

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <>
    <div>
                <div className="content p-0">
                  <div className="Details-Cont-Display">
                            {isSuperAdmin && (
                      <>
                        <div className="container p-0">
                          <div className="row g-5">
                           
                          
                          
                            <div className="col-md-3">
                              <div className="FundWallet-BTN-Container22">
                                <button
                                  className="Funding-Tittle"
                                >
                                  Create Admin
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                
                 
                </div>
              </div>
        
    
  
   </>
  );
};

export default AdminDashboard;
