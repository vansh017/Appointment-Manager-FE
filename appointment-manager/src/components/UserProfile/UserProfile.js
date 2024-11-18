import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <img 
        src="/profile-placeholder.png" 
        alt="User Profile" 
        className="profile-img"
      />
      <span className="username">John Doe</span>
    </div>
  );
};

export default UserProfile; 