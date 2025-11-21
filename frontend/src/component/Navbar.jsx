import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { authUtils, authAPI } from '../services/auth';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Call logout API if backend is available
      await authAPI.logout();
    } catch (error) {
      console.log('Logout API call failed, clearing local storage');
    } finally {
      authUtils.clearAuth();
      navigate('/login');
    }
  };

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/attendance', label: 'Attendance', icon: '📅' },
    { path: '/report', label: 'Report', icon: '📋' },
  ];

  const studentData = authUtils.getStudentData();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="brand-icon">🎓</span>
          <span className="brand-text">FaceAttend</span>
        </div>

        {/* Desktop Navigation */}
        <div className="nav-links">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

          <Link to="/profile" className="profile-link">
            <span className="profile-icon">👤</span>
            <span className="profile-text">
              {studentData?.name || 'Profile'}
            </span>
          </Link>

          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-icon">🚪</span>
            <span className="logout-text">Logout</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="mobile-nav">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`mobile-nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="mobile-user-info">
            <span>Welcome, {studentData?.name || 'Student'}</span>
          </div>
          <button onClick={handleLogout} className="mobile-logout-btn">
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;