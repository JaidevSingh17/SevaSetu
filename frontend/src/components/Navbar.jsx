import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-surface/80 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              SevaSetu
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-text hover:text-primary transition-colors">
                  Dashboard
                </Link>
                {user.role === 'donor' && (
                  <Link to="/requirements" className="text-text hover:text-accent transition-colors">
                    Requirements
                  </Link>
                )}
                <div className="flex items-center space-x-4 border-l border-slate-600 pl-4 ml-2">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-semibold">{user.name}</span>
                    <span className="text-xs text-textMuted capitalize">{user.role} {user.role === 'ngo' && (user.isVerified ? '✓' : '(Pending)')}</span>
                  </div>
                  <button onClick={handleLogout} className="btn-secondary text-sm px-3 py-1.5">
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-text hover:text-primary transition-colors font-medium">Log In</Link>
                <Link to="/register" className="btn-primary text-sm">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
