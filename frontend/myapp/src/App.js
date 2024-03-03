import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import ForumPage from './pages/ForumPage';
import UserSignUp from './pages/UserSignUp';
import LogInTest from './pages/LoginTest';
import Dashboard from './pages/DashboardPage';
import Profile from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';

// Enable axios withCredentials globally
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LogInTest />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/forums" element={<ProtectedRoute element={<ForumPage />} />} />
          {/* Define other protected routes as needed */}
        </Routes>
      </Router>
    </UserProvider>
  );
}


export default App;
