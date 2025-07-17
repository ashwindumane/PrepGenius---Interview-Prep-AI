import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/SignUp';
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Home/Dashboard";
import InterviewPrep from "./pages/InterviewPrep/InterviewPrep";

// Context
import UserProvider from "./context/userContext";

const App = () => {
  return (
    <Router>
      <UserProvider>
        <div>
          {/* ✅ Global Toaster (only one instance) */}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontSize: "13px",
              },
            }}
          />

          {/* Routes */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected / App Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/interview-prep/:sessionId" element={<InterviewPrep />} />
          </Routes>
        </div>
      </UserProvider>
    </Router>
  );
};

export default App;
