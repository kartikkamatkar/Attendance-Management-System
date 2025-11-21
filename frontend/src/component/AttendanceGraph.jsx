import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AttendanceGraph = ({ data }) => {
  const chartData = {
    labels: data.map(item => {
      const date = new Date(item.date);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Attendance',
        data: data.map(item => item.present ? 1 : 0),
        borderColor: 'var(--success)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'var(--success)',
        pointBorderColor: 'var(--background)',
        pointBorderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            return context.parsed.y === 1 ? 'Present' : 'Absent';
          }
        }
      },
    },
    scales: {
      x: {
        grid: {
          color: 'var(--border)',
        },
        ticks: {
          color: 'var(--text-secondary)',
        },
      },
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 1,
          callback: function(value) {
            return value === 1 ? 'Present' : value === 0 ? 'Absent' : '';
          },
          color: 'var(--text-secondary)',
        },
        grid: {
          color: 'var(--border)',
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'nearest',
    },
  };

  return (
    <div className="attendance-graph">
      <div className="graph-header">
        <h3>Attendance Trend (Last 30 Days)</h3>
        <div className="graph-legend">
          <div className="legend-item">
            <div className="legend-color present"></div>
            <span>Present</span>
          </div>
        </div>
      </div>
      <div className="graph-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default AttendanceGraph;