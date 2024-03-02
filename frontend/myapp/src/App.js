// src/App.js

import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ForumPage from './pages/ForumPage';
import UserSignUp from './pages/UserSignUp';
import LogInTest from './pages/LoginTest';
import Dashboard from './pages/DashboardPage';
import Profile from './pages/ProfilePage';

// Enable axios withCredentials globally
axios.defaults.withCredentials = true;

// Import other pages as needed

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="forums" element={<ForumPage />} />
          <Route path="signup" element={<UserSignUp />} />
          <Route path="login" element={<LogInTest />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          {/* Define other routes as needed */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
