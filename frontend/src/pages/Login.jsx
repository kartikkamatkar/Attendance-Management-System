import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Try real API first
      const response = await authAPI.login(formData);
      const { token, student } = response.data;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('studentData', JSON.stringify(student));
      
      navigate('/');
    } catch (error) {
      // Fallback to mock login for demo
      if (formData.email === 'student@college.edu' && formData.password === 'password') {
        const mockToken = 'mock-jwt-token-' + Date.now();
        const mockStudent = {
          id: 1,
          name: 'John Doe',
          email: 'student@college.edu',
          rollNumber: '2023001',
          branch: 'Computer Science',
          division: 'A'
        };
        
        localStorage.setItem('authToken', mockToken);
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('studentData', JSON.stringify(mockStudent));
        navigate('/');
      } else {
        setError('Invalid credentials. Use: student@college.edu / password');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>Welcome Back! 👋</h1>
          <p>Sign in to your FaceAttend account</p>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">College Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your college email"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading-spinner-small"></div>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register" className="auth-link">
              Sign up here
            </Link>
          </p>
        </div>

        <div className="demo-credentials">
          <h3>Demo Credentials:</h3>
          <p>Email: student@college.edu</p>
          <p>Password: password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;