import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Forum from './components/Forum';
//import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Header from './components/Header';


// Setting axios to send cookies with each request, necessary for sessions or authentication.
axios.defaults.withCredentials = true;

function App() {
  return (
    // Wrapping the entire app in UserProvider to manage user state globally.
    <UserProvider>
      <Router>
        <Header /> {/* Consistent header across all pages */}
        <div className="app-container"> {/* Layout container */}
          <Sidebar /> {/* Navigation sidebar */}
          <div className="content"> {/* Main content area */}
            <Routes>
              {/* Define routes for different components. Uncomment the next line to use protected routes. */}
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
