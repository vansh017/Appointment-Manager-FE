import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu } from "primereact/menu";
import "./Header.css";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const hideUserIcon = ["/login", "/signup"].includes(location.pathname);

  const userData = JSON.parse(localStorage.getItem("userData"));

  const menuItems = userData
    ? [
        {
          label: "Profile",
          icon: "pi pi-user",
          command: () => {
            navigate("/profile");
          },
        },
        {
          label: "Logout",
          icon: "pi pi-sign-out",
          command: () => {
            localStorage.removeItem("userData");
            navigate("/login");
          },
        },
      ]
    : [
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
        <div className="app-title" onClick={() => navigate("/")}>
          <h1>My Application</h1>
        </div>
        {!hideUserIcon && (
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
        )}
      </div>
    </header>
  );
};

export default Header;
