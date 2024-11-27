import React, { useState } from 'react';
import { LogIn } from 'lucide-react';
import './ShopOwnerView.css';

const ShopOwnerView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="shop-owner-container">
      <div className="login-card">
        <div className="icon-container">
          <LogIn className="login-icon" />
        </div>
        
        <h2 className="login-title">
          Shop Owner Login
        </h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <div>
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                required
              />
            </div>

            <button
              type="submit"
              className="submit-button"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ShopOwnerView;