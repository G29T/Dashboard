import React from 'react';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
import Register from './components/register/Register';
import Login from './components/log-in/LogIn';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Register />} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
