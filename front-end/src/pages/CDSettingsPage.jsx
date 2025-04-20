import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiCamera, FiTrash2 } from 'react-icons/fi';
import '../style/CDSettingsPage.css';

function SettingsPage() {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profilePicture, setProfilePicture] = useState('/images/default-profile.jpg');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your save logic here
    console.log('Form submitted:', formData);
    alert('Profile updated successfully!');
  };

  const handleDeleteAccount = () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }
    
    // Add your account deletion logic here
    console.log('Account deletion confirmed');
    alert('Account has been permanently deleted');
    // Redirect to login or home page after deletion
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Profile Settings</h1>
      
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
            <label htmlFor="name"><FiUser style={{ marginRight: '5px' }} />Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
            />
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
            />
          </div>
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