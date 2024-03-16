// ProtectedRoute.js
// Component to protect routes that require user authentication.

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import context to access user state.

const ProtectedRoute = ({ element, ...rest }) => {
    const { user } = useUser(); // Retrieve user from context.

    // Redirect to login if there is no authenticated user.
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Render the component if the user is authenticated.
    return React.cloneElement(element, rest);
};

export default ProtectedRoute;
