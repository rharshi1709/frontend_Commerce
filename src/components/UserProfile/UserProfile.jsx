import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import './UserProfile.css';

function UserProfile() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    alternateEmail: '',
    profession: '',
    bio: ''
  });

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserEmail(decoded.email || 'user@example.com');
        loadUserProfile();
      } catch (err) {
        setError('Invalid token');
      }
    }
  }, []);

  const loadUserProfile = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setFormData(JSON.parse(savedProfile));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      alert('Profile updated successfully!');
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError('Error saving profile: ' + err.message);
      console.error('Error saving profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {userEmail ? userEmail.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="profile-info-header">
            <h1>My Account</h1>
            <p className="email-display">{userEmail}</p>
          </div>
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        {!isEditing ? (
          <div className="profile-content">
            <div className="profile-section">
              <h2>Personal Information</h2>
              <div className="info-group">
                <label>Full Name</label>
                <p>{formData.fullName || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Email</label>
                <p>{userEmail}</p>
              </div>
              <div className="info-group">
                <label>Phone</label>
                <p>{formData.phone || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Alternate Email</label>
                <p>{formData.alternateEmail || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Profession</label>
                <p>{formData.profession || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Bio</label>
                <p>{formData.bio || 'Not provided'}</p>
              </div>
            </div>

            <div className="profile-actions">
              <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                Edit Profile
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSaveProfile} className="profile-form">
            <div className="form-section">
              <h2>Edit Personal Information</h2>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>

              <div className="form-group">
                <label>Alternate Email</label>
                <input
                  type="email"
                  name="alternateEmail"
                  value={formData.alternateEmail}
                  onChange={handleInputChange}
                  placeholder="Enter alternate email"
                />
              </div>

              <div className="form-group">
                <label>Profession</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  placeholder="Enter your profession"
                />
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself"
                  rows="4"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEditing(false);
                    loadUserProfile();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
