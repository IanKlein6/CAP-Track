// src/App.js

import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeTestPage from './pages/HomeTestPage';
import UserSignUp from './pages/UserSignUp';
import LogInTest from './pages/LoginTest';
import Dashboard from './pages/DashboardPage';
import Profile from './pages/ProfilePage';

import Header from './components/common/Header';

// Enable axios withCredentials globally
axios.defaults.withCredentials = true;

// Import other pages as needed

function App() {
  const username = "John Doe";
  return (
    <Router>
      <Header username={username} />
      <Routes>
        <Route path="test" element={<HomeTestPage />} />
        <Route path="signup" element={<UserSignUp />} />
        <Route path="login" element={<LogInTest />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
