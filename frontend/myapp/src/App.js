import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Forum from './components/Forum';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider>
      <Router>
        <Header /> 
        <div className="app-container"> 
          <Sidebar /> 
          <div className="content"> 
            <Routes>
              {/* <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/forum" element={<Forum />} />
            </Routes>
          </div>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
