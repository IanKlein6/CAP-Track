import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Login from './Login';
import SignUp from './SignUp';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext'; 
const root = ReactDOM.createRoot(document.getElementById('root'));

// Assuming you have a way to check authentication
const isAuthenticated = () => {
  // You might check local storage, context, or Redux state
  return localStorage.getItem('isLoggedIn') === 'true';
};

root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={isAuthenticated() ? <Navigate to="/app" /> : <Login />} />
          <Route path="/app" element={isAuthenticated() ? <App /> : <Navigate to="/" />} />
          <Route path="/SignUp" element={<SignUp />} /> 
          {/* Redirect any other path to "/" */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);

// Optional: Performance reporting
reportWebVitals();
