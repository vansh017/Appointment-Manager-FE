import React from 'react';
import { Link } from 'react-router-dom';
import { Scissors, User } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="flex items-center">
            <Link to="/" className="navbar-link">
              <Scissors className="navbar-icon" />
              <span className="navbar-title">StyleQueue</span>
            </Link>
          </div>
          <div className="flex items-center">
            <Link to="/" className="user-link">
              <User className="user-icon" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;