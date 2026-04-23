import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Check local storage for user token
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/login`, { email, password });
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/auth/register`, userData);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, apiBaseUrl }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
