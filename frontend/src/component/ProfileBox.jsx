import React from 'react';
import { Link } from 'react-router-dom';

const ProfileBox = ({ student, todayAttendance }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'present':
        return { 
          class: 'present', 
          icon: '✅', 
          text: 'Present',
          time: todayAttendance?.time 
        };
      case 'absent':
        return { 
          class: 'absent', 
          icon: '❌', 
          text: 'Absent',
          time: null 
        };
      case 'late':
        return { 
          class: 'late', 
          icon: '⚠️', 
          text: 'Late',
          time: todayAttendance?.time 
        };
      default:
        return { 
          class: 'not-marked', 
          icon: '⏳', 
          text: 'Not Marked',
          time: null 
        };
    }
  };

  const statusConfig = getStatusConfig(todayAttendance?.status || 'not-marked');

  return (
    <div className="profile-box">
      <div className="profile-header">
        <div className="profile-image">
          {student.profileImage ? (
            <img src={student.profileImage} alt={student.name} />
          ) : (
            <div className="default-avatar">👨‍🎓</div>
          )}
        </div>
        <div className="profile-info">
          <h2>{student.name}</h2>
          <p>{student.email}</p>
          <div className="profile-badges">
            <span className="badge">{student.rollNumber}</span>
            <span className="badge">{student.branch}</span>
            <span className="badge">Div {student.division}</span>
          </div>
        </div>
      </div>

      <div className={`attendance-status ${statusConfig.class}`}>
        <div className="status-header">
          <span className="status-icon">{statusConfig.icon}</span>
          <span className="status-text">Today's Attendance</span>
        </div>
        <div className="status-details">
          <span className="status-value">{statusConfig.text}</span>
          {statusConfig.time && (
            <span className="status-time">at {statusConfig.time}</span>
          )}
        </div>
        {todayAttendance?.subject && (
          <div className="status-subject">
            Subject: {todayAttendance.subject}
          </div>
        )}
      </div>

      <div className="profile-actions">
        <Link to="/profile" className="edit-profile-btn">
          <span className="btn-icon">✏️</span>
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default ProfileBox;