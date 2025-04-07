import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        <div className="slide-in-up">
          <h1 className="text-6xl font-bold text-primary-light mb-4">404</h1>
        </div>
        
        <div className="slide-in-up delay-200">
          <h2 className="text-2xl font-bold text-white mb-6">Page Not Found</h2>
        </div>
        
        <div className="slide-in-up delay-300">
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        
        <div className="slide-in-up delay-400">
          <Link to="/" className="btn">
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;