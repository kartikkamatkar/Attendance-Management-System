import axios from 'axios';

// Update with your Spring Boot backend URL
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('studentData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication APIs
export const authAPI = {
  login: (credentials) => api.post('/auth/student/login', credentials),
  register: (studentData) => api.post('/auth/student/register', studentData),
  logout: () => api.post('/auth/logout'),
  refreshToken: () => api.post('/auth/refresh'),
};

// Student APIs
export const studentAPI = {
  getProfile: () => api.get('/students/me'),
  getTodayAttendance: () => api.get('/attendance/today'),
  getAttendanceSummary: () => api.get('/attendance/summary'),
  getLast30Days: () => api.get('/attendance/last-30-days'),
  getRecentAttendance: () => api.get('/attendance/recent'),
  downloadReport: (format) => api.get(`/reports/attendance?format=${format}`, {
    responseType: 'blob'
  }),
  updateProfile: (data) => api.put('/students/profile', data),
  uploadProfilePicture: (formData) => api.post('/students/profile-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
};

// Mock data for development
export const mockData = {
  student: {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@student.edu',
    rollNumber: '2023001',
    branch: 'Computer Science',
    division: 'A',
    profileImage: null,
  },
  todayAttendance: {
    status: 'PRESENT',
    timestamp: new Date().toISOString(),
    subject: 'Data Structures',
    classType: 'THEORY'
  },
  summary: {
    overallAttendance: 85.5,
    monthlyAttendance: 90.2,
    totalPresent: 128,
    totalAbsent: 22,
    totalClasses: 150,
    attendanceStreak: 5
  },
  last30Days: Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    present: Math.random() > 0.3,
    subject: ['Data Structures', 'Algorithms', 'Database Systems'][i % 3]
  })),
  recentAttendance: Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: ['09:00 AM', '10:30 AM', '01:15 PM', '03:00 PM'][i % 4],
    status: ['PRESENT', 'ABSENT', 'PRESENT', 'LATE'][i % 4],
    subject: ['Data Structures', 'Algorithms', 'Database Systems', 'Web Development'][i % 4]
  }))
};

export default api;