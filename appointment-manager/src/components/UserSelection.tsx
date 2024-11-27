import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Store } from 'lucide-react';
import './UserSelection.css';

const UserSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="user-selection-container">
      <h1 className="user-selection-title">
        Welcome to StyleQueue
      </h1>
      <div className="selection-grid">
        <button
          onClick={() => navigate('/customer')}
          className="selection-button"
        >
          <Users className="selection-icon" />
          <h2 className="selection-heading">I'm a Customer</h2>
          <p className="selection-description">
            Book appointments and view waiting times at nearby salons
          </p>
        </button>

        <button
          onClick={() => navigate('/shop-owner')}
          className="selection-button"
        >
          <Store className="selection-icon" />
          <h2 className="selection-heading">I'm a Shop Owner</h2>
          <p className="selection-description">
            Manage your salon's queue and appointments
          </p>
        </button>
      </div>
    </div>
  );
}

export default UserSelection;