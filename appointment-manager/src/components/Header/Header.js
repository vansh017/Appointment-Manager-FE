import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import "./Header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Sign Up",
      icon: "pi pi-user-plus",
      command: () => {
        navigate("/signup");
      },
    },
    {
      label: "Login",
      icon: "pi pi-sign-in",
      command: () => {
        navigate("/login");
      },
    },
  ];

  return (
    <header className="main-header">
      <div className="header-content">
        <div className="app-title">
          <h1>My Application</h1>
        </div>
        <div className="user-menu">
          <button
            className="user-icon-button"
            onClick={(e) => menuRef.current.toggle(e)}
          >
            <i className="pi pi-user"></i>
          </button>
          <Menu
            model={menuItems}
            popup
            ref={menuRef}
            className="dropdown-menu"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
