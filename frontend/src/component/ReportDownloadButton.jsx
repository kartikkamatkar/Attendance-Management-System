import React, { useState } from 'react';
import { studentAPI } from '../services/api';

const ReportDownloadButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (format) => {
    try {
      setIsLoading(true);
      const response = await studentAPI.downloadReport(format);
      
      // Create blob link for download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `attendance-report.${format}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download report. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="report-download">
      <h3>Download Report</h3>
      <p>Export your attendance data for offline use</p>
      <div className="download-buttons">
        <button 
          onClick={() => handleDownload('pdf')}
          disabled={isLoading}
          className="download-btn pdf"
        >
          <span className="btn-icon">📄</span>
          {isLoading ? 'Downloading...' : 'Download PDF'}
        </button>
        <button 
          onClick={() => handleDownload('csv')}
          disabled={isLoading}
          className="download-btn csv"
        >
          <span className="btn-icon">📊</span>
          {isLoading ? 'Downloading...' : 'Download CSV'}
        </button>
      </div>
    </div>
  );
};

export default ReportDownloadButton;