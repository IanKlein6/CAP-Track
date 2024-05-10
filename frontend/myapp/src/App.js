import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext'; // Correct import path
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Forum from './components/Forum';
import Login from './Login';
import SignUp from './SignUp';
import Sidebar from './components/Sidebar';
import Header from './components/Header';


function App() {
  const { user } = useUser();

  return (
    <Router>
      <Header />
      {user && (
        <div className="app-container">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/" element={<Navigate replace to="/dashboard" />} />
              <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
          </div>
        </div>
      )}
      {!user && (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
