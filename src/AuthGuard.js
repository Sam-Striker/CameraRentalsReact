import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ component: Component, isAuthenticated }) => {
  if (isAuthenticated) {
    return <Component />;
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthGuard;
