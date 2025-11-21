import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI, mockData } from '../services/api';

const Profile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(mockData.student);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    phone: '',
    branch: student.branch,
    division: student.division,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // await studentAPI.updateProfile(formData);
      setStudent(prev => ({ ...prev, ...formData }));
      setIsEditing(false);
      // Show success message
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>
        <h1>My Profile</h1>
        <button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={`edit-btn ${isLoading ? 'loading' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-image-section">
            <div className="profile-image-large">
              {student.profileImage ? (
                <img src={student.profileImage} alt={student.name} />
              ) : (
                <div className="default-avatar-large">👨‍🎓</div>
              )}
            </div>
            {isEditing && (
              <button className="change-photo-btn">
                📷 Change Photo
              </button>
            )}
          </div>

          <div className="profile-details">
            <div className="form-group">
              <label>Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              ) : (
                <p className="form-value">{student.name}</p>
              )}
            </div>

            <div className="form-group">
              <label>Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              ) : (
                <p className="form-value">{student.email}</p>
              )}
            </div>

            <div className="form-group">
              <label>Roll Number</label>
              <p className="form-value">{student.rollNumber}</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Branch</label>
                {isEditing ? (
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Mechanical">Mechanical</option>
                  </select>
                ) : (
                  <p className="form-value">{student.branch}</p>
                )}
              </div>

              <div className="form-group">
                <label>Division</label>
                {isEditing ? (
                  <select
                    name="division"
                    value={formData.division}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                ) : (
                  <p className="form-value">{student.division}</p>
                )}
              </div>
            </div>

            {!isEditing && (
              <div className="profile-stats">
                <div className="profile-stat">
                  <span className="stat-value">85.5%</span>
                  <span className="stat-label">Overall Attendance</span>
                </div>
                <div className="profile-stat">
                  <span className="stat-value">128</span>
                  <span className="stat-label">Total Presents</span>
                </div>
                <div className="profile-stat">
                  <span className="stat-value">22</span>
                  <span className="stat-label">Total Absents</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;