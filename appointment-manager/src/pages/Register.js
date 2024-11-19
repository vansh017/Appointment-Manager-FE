import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    // ... existing register logic ...
  };

  return (
    <div className="register-container">
      <Card className="register-card">
        <h2>Register</h2>
        {error && <Message severity="error" text={error} />}
        <form onSubmit={handleRegister}>
          <div className="p-field">
            <span className="p-float-label">
              <InputText
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
              <label htmlFor="name">Name</label>
            </span>
          </div>
          <div className="p-field">
            <span className="p-float-label">
              <InputText
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="p-field">
            <span className="p-float-label">
              <Password
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <label htmlFor="password">Password</label>
            </span>
          </div>
          <div className="p-field">
            <span className="p-float-label">
              <Password
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                feedback={false}
              />
              <label htmlFor="confirmPassword">Confirm Password</label>
            </span>
          </div>
          <Button label="Register" type="submit" className="p-button-primary" />
        </form>
      </Card>
    </div>
  );
};

export default Register;
