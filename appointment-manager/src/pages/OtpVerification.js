import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { verifyOtp } from "../services/api";
import "./OtpVerification.css";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const username = localStorage.getItem("email");
      const response = await verifyOtp({ otp: otp, username: username });
      if (response.status === 200) {
        if (response.data.data.access_token) {
          localStorage.setItem("token", response.data.data.access_token);
        }
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="otp-container">
      <Card className="otp-card">
        <h2>OTP Verification</h2>
        <p>Enter verification code</p>

        <form onSubmit={handleSubmit} className="otp-form">
          <div className="input-field">
            <InputNumber
              value={otp}
              onValueChange={(e) => setOtp(e.value)}
              useGrouping={false}
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              keyfilter="int"
            />
          </div>

          <Button
            type="submit"
            label="Verify"
            loading={loading}
            className="verify-button"
          />

          <Button
            type="button"
            label="Resend Code"
            link
            className="resend-button"
          />
        </form>
      </Card>
    </div>
  );
};

export default OtpVerification;
