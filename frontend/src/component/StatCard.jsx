import React from 'react';

const StatCard = ({ title, value, subtitle, icon, color, trend }) => {
  return (
    <div className={`stat-card ${color}`}>
      <div className="stat-header">
        <div className="stat-icon">{icon}</div>
        {trend && (
          <div className={`trend ${trend.direction}`}>
            {trend.direction === 'up' ? '↗' : '↘'} {trend.value}
          </div>
        )}
      </div>
      <div className="stat-content">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-title">{title}</p>
        {subtitle && <p className="stat-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
};

export default StatCard;