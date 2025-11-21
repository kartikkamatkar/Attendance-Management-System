import React, { useState, useEffect } from 'react';
import { studentAPI, mockData, isBackendAvailable } from '../services/api';
import ProfileBox from '../components/ProfileBox';
import StatCard from '../components/StatCard';
import AttendanceGraph from '../components/AttendanceGraph';
import RecentActivity from '../components/RecentActivity';
import ReportDownloadButton from '../components/ReportDownloadButton';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [todayAttendance, setTodayAttendance] = useState(null);
  const [summary, setSummary] = useState(null);
  const [last30Days, setLast30Days] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingMockData, setUsingMockData] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Check if backend is available
      const backendAvailable = await isBackendAvailable();
      
      if (backendAvailable) {
        // Use real API calls
        const [profileRes, todayRes, summaryRes, last30Res, recentRes] = await Promise.all([
          studentAPI.getProfile(),
          studentAPI.getTodayAttendance(),
          studentAPI.getAttendanceSummary(),
          studentAPI.getLast30Days(),
          studentAPI.getRecentAttendance()
        ]);

        setStudent(profileRes.data);
        setTodayAttendance(todayRes.data);
        setSummary(summaryRes.data);
        setLast30Days(last30Res.data);
        setRecentActivities(recentRes.data);
        setUsingMockData(false);
        
        // Store student data in localStorage for quick access
        localStorage.setItem('studentData', JSON.stringify(profileRes.data));
      } else {
        // Use mock data as fallback
        setStudent(mockData.student);
        setTodayAttendance(mockData.todayAttendance);
        setSummary(mockData.summary);
        setLast30Days(mockData.last30Days);
        setRecentActivities(mockData.recentAttendance);
        setUsingMockData(true);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to mock data
      setStudent(mockData.student);
      setTodayAttendance(mockData.todayAttendance);
      setSummary(mockData.summary);
      setLast30Days(mockData.last30Days);
      setRecentActivities(mockData.recentAttendance);
      setUsingMockData(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="student-dashboard">
      {/* Welcome Header */}
      <div className="welcome-header">
        <div className="header-top">
          <h1>Hello, {student?.name} 👋</h1>
          {usingMockData && (
            <div className="demo-badge">
              🚀 Demo Mode - Using Mock Data
            </div>
          )}
        </div>
        <p>Here's your attendance overview for today</p>
      </div>

      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="left-column">
          <ProfileBox 
            student={student} 
            todayAttendance={todayAttendance} 
            usingMockData={usingMockData}
          />
          
          <div className="stats-grid">
            <StatCard
              title="Overall Attendance"
              value={`${summary?.overallAttendance || summary?.overall}%`}
              subtitle="All subjects"
              icon="📈"
              color="primary"
              trend={{ direction: 'up', value: '2.1%' }}
            />
            <StatCard
              title="Monthly Attendance"
              value={`${summary?.monthlyAttendance || summary?.monthly}%`}
              subtitle="This month"
              icon="📅"
              color="success"
              trend={{ direction: 'up', value: '5.3%' }}
            />
            <StatCard
              title="Total Presents"
              value={summary?.totalPresent}
              subtitle={`/ ${summary?.totalClasses} classes`}
              icon="✅"
              color="info"
            />
            <StatCard
              title="Attendance Streak"
              value={`${summary?.attendanceStreak || '5'} days`}
              subtitle="Current streak"
              icon="🔥"
              color="warning"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <AttendanceGraph data={last30Days} />
          <RecentActivity activities={recentActivities} />
          <ReportDownloadButton usingMockData={usingMockData} />
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;