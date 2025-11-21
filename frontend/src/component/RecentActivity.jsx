import React from 'react';

const RecentActivity = ({ activities }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return { icon: '✅', color: 'var(--success)', label: 'Present' };
      case 'absent':
        return { icon: '❌', color: 'var(--danger)', label: 'Absent' };
      case 'late':
        return { icon: '⚠️', color: 'var(--warning)', label: 'Late' };
      default:
        return { icon: '⏳', color: 'var(--text-secondary)', label: 'Pending' };
    }
  };

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3>Recent Attendance</h3>
        <span className="activity-count">{activities.length} records</span>
      </div>
      <div className="activity-list">
        {activities.map(activity => {
          const statusInfo = getStatusIcon(activity.status);
          return (
            <div key={activity.id} className="activity-item">
              <div className="activity-date">
                <div className="date">{new Date(activity.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}</div>
                <div className="time">{activity.time}</div>
              </div>
              <div className="activity-subject">
                {activity.subject}
              </div>
              <div 
                className="activity-status"
                style={{ color: statusInfo.color }}
              >
                <span className="status-icon">{statusInfo.icon}</span>
                {statusInfo.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;