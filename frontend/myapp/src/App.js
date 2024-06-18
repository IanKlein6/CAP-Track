import './';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './context/UserContext';
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
      <div className="app-container"> 
        <Header />
        {user && <Sidebar />}
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/forum" element={<Forum />} />
            {!user ? (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/login" />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/dashboard" />} />
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
