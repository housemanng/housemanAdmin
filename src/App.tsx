
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminUsers from "./pages/AdminUsers";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

import { Toaster } from "react-hot-toast";


import AdminLayout from "./components/Layouts/AdminLayout";








const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/" element={<AdminLayout />}>
            <Route element={<ProtectedRoute />}>
              <Route path="/admindashboard" element={<AdminDashboard />} />
              <Route path="/adminusers" element={<AdminUsers />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/adminlogin" replace />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
