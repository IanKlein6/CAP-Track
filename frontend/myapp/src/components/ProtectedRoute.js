// ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const ProtectedRoute = ({ element, ...rest }) => {
    const { user } = useUser();
    
    // If there's no user, redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // If there is a user, render the element passed to ProtectedRoute
    return React.cloneElement(element, rest);
};

export default ProtectedRoute;
