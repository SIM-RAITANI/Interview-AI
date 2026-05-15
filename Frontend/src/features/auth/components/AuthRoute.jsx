import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';

const AuthRoute = ({ children }) => {
    const { loading, user } = useAuth();

    if (loading) {
        return (
            <main className="loading-screen">
                <div className="loader-container">
                    <div className="spinner"></div>
                    <h1>Checking session...</h1>
                </div>
            </main>
        );
    }

    
    if (user) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default AuthRoute;