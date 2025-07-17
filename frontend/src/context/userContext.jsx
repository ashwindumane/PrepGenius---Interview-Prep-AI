// src/context/userContext.js
import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPath";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
      setUser(response.data); // Assume backend returns user object directly
    } catch (error) {
      console.error("Failed to fetch user:", error);
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const updateUser = (responseData) => {
    // Handle both login and profile update scenarios
    if (responseData.token) {
      localStorage.setItem("token", responseData.token);
    }
    setUser(responseData.user || responseData);
  };

  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
    window.location.reload(); // Ensure clean state
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {loading ? (
        <div className="full-page-loader">Loading user...</div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export default UserProvider;