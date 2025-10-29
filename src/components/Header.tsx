import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogIn, User } from 'lucide-react';

const Header: React.FC = () => {
  const navigate = useNavigate();
  
  // Check if user is logged in
  const user = localStorage.getItem('aifit_user');
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem('aifit_user');
    localStorage.removeItem('aifit_signed_up');
    localStorage.removeItem('aifit_onboarding_completed');
    localStorage.removeItem('aifit_profile');
    localStorage.removeItem('aifit_daily_data');
    localStorage.removeItem('aifit_food_entries');
    localStorage.removeItem('aifit_exercise_entries');
    localStorage.removeItem('aifit_last_active_date');
    // Note: We keep aifit_accounts so users can login again
    navigate('/');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/app" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-bold">✨</span>
          </div>
          <span className="text-xl font-bold text-gray-900">AiFit</span>
        </Link>

        {/* Right side - Login/User menu */}
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors"
          >
            Landing Page
          </Link>
          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                Welcome, {JSON.parse(user || '{}').name || 'User'}
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogIn size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <LogIn size={16} />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
