// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeTestPage from './pages/HomeTestPage';
import UserSignUp from './pages/UserSignUp';

// Import other pages as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="test/" element={<HomeTestPage />} />
        <Route path="signup/" element={<UserSignUp />} />
        
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
