'use client';
import React, {useEffect, useState} from 'react';

const ProtectedRoute = ({children}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const userSession = sessionStorage.getItem('userSession');
    if (userSession) {
      setIsAuthenticated(true);
    } else {
      // Redirect to login if no session found
      window.location.href = '/auth/login';
    }
  }, []);

  if (!isAuthenticated) {
    return <div>Loading...</div>; // Optionally show a loading state while checking authentication
  }

  return <>{children}</>;
};

export default ProtectedRoute;
