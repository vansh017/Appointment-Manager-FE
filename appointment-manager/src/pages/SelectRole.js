import React from "react";
import { useNavigate } from "react-router-dom";
import "./SelectRole.css";

function SelectRole() {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem("userRole", role);

    navigate("/");
  };

  return (
    <div className="select-role-container">
      <h1 className="select-role-title">Select Your Role</h1>
      <div className="roles-wrapper">
        <div className="role-card" onClick={() => handleRoleSelect("customer")}>
          <div className="role-number">#1</div>
          <div className="role-content">
            <h2 className="role-title">Customer</h2>
            <div className="role-info">
              <span className="role-value">Browse & Order</span>
            </div>
          </div>
        </div>

        <div
          className="role-card"
          onClick={() => handleRoleSelect("shop_owner")}
        >
          <div className="role-number">#2</div>
          <div className="role-content">
            <h2 className="role-title">Shop Owner</h2>
            <div className="role-info">
              <span className="role-value">Manage Shop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectRole;
