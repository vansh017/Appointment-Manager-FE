import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
import "./Login.css";
import { loginUser } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userData = { email, password };
      console.log(userData);

      const data = await loginUser(userData);

      if (data.status === 200) {
        navigate("/verify-otp");
        localStorage.setItem("email", email);
      }

      // Store token if your API returns one
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect to dashboard or home page
    } catch (err) {
      setError(err.message || "An error occurred during login");
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <h2>Login</h2>
        {error && <Message severity="error" text={error} />}
        <form onSubmit={handleLogin}>
          <div className="p-field">
            <span className="p-float-label">
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </span>
          </div>
          <div className="p-field">
            <span className="p-float-label">
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
              />
              <label htmlFor="password">Password</label>
            </span>
          </div>
          <Button label="Login" type="submit" className="p-button-primary" />
        </form>
      </Card>
    </div>
  );
};

export default Login;
