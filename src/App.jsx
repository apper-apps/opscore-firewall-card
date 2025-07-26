import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "@/index.css";
import Layout from "@/components/organisms/Layout";
import Assessment from "@/components/pages/Assessment";
import Welcome from "@/components/pages/Welcome";
import Dashboard from "@/components/pages/Dashboard";
import Results from "@/components/pages/Results";


function AppContent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get authentication status with proper error handling
  
  // Initialize ApperUI once when the app loads
  
  // Authentication methods to share via context
  
  // Don't render routes until initialization is complete
  
return (
<div className="min-h-screen bg-gradient-to-br from-surface via-white to-gray-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="results" element={<Results />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        className="toast-container" 
        style={{
          zIndex: 9999
        }} 
      />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;