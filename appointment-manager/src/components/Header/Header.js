import React from "react";
import "./Header.css";
import UserProfile from "../UserProfile/UserProfile";

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-content">
        <div className="app-title">
          <h1>My Application</h1>
        </div>
        <UserProfile />
      </div>
    </header>
  );
};

export default Header;
