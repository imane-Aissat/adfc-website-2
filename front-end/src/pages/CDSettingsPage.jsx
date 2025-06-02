import React, { useState, useEffect } from 'react';
import { FiUser, FiMail, FiLock, FiCamera, FiTrash2 } from 'react-icons/fi';
import '../style/CDSettingsPage.css';

function SettingsPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [profilePicture, setProfilePicture] = useState('/images/default-profile.jpg');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Fetch chef de département profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/settings/chef-departement');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch profile');
        }
        
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePictureChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfilePicture(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    try {
      // Validate passwords match if changing password
      if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
        throw new Error('New passwords do not match');
      }
      
      const response = await fetch('http://localhost:5000/api/settings/chef-departement', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to update profile');
      }
      
      setSuccess('Profile updated successfully');
      // Clear password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    try {
      const response = await fetch('/api/settings/chef-http://localhost:5000/api/settings/chef-departement', {
        method: 'DELETE'
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete account');
      }
      
      // Redirect to login or home page after deletion
      window.location.href = '/login';
      
    } catch (err) {
      setError(err.message);
      setShowDeleteConfirm(false);
    }
  };

  if (loading) {
    return (
      <div className="settings-container">
        <div className="loading-spinner">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <h1 className="settings-title">Profile Settings</h1>
      
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className="profile-picture-container">
          <img src={profilePicture} alt="Profile" className="profile-picture" />
          <label className="btn">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePictureChange}
              style={{ display: 'none' }}
            />
            <FiCamera style={{ marginRight: '5px' }} />
            Change Photo
          </label>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName"><FiUser style={{ marginRight: '5px' }} />First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="form-control"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName"><FiUser style={{ marginRight: '5px' }} />Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="form-control"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email"><FiMail style={{ marginRight: '5px' }} />Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="password-section">
          <h3>Password Settings</h3>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="currentPassword"><FiLock style={{ marginRight: '5px' }} />Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                className="form-control"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Required for password changes"
              />
            </div>

            <div className="form-group">
              <label htmlFor="newPassword"><FiLock style={{ marginRight: '5px' }} />New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                className="form-control"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Leave blank to keep current"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword"><FiLock style={{ marginRight: '5px' }} />Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Required if changing password"
              />
            </div>
          </div>
        </div>

        <div className="buttons-container">
          <button type="submit" className="btn save-btn">Save Changes</button>
          
          <button 
            type="button" 
            className={`btn delete-btn ${showDeleteConfirm ? 'confirm-mode' : ''}`}
            onClick={handleDeleteAccount}
          >
            <FiTrash2 style={{ marginRight: '5px' }} />
            {showDeleteConfirm ? 'Confirm Deletion' : 'Delete Account'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SettingsPage;