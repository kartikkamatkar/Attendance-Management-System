import api from './api';

export const authAPI = {
  // Student login
  login: (credentials) => api.post('/auth/student/login', credentials),
  
  // Student registration
  register: (studentData) => api.post('/auth/student/register', studentData),
  
  // Logout
  logout: () => api.post('/auth/logout'),
  
  // Refresh token
  refreshToken: () => api.post('/auth/refresh'),
  
  // Forgot password
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  
  // Reset password
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
  
  // Verify email
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),
};

// Auth utility functions
export const authUtils = {
  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    return !!token;
  },
  
  // Get current user role
  getCurrentRole: () => {
    return localStorage.getItem('userRole');
  },
  
  // Check if user is student
  isStudent: () => {
    return authUtils.getCurrentRole() === 'student';
  },
  
  // Get stored student data
  getStudentData: () => {
    const data = localStorage.getItem('studentData');
    return data ? JSON.parse(data) : null;
  },
  
  // Clear auth data
  clearAuth: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('studentData');
  },
  
  // Set auth data after login
  setAuth: (token, role, studentData = null) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role);
    if (studentData) {
      localStorage.setItem('studentData', JSON.stringify(studentData));
    }
  }
};