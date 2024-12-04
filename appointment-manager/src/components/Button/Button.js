import React from "react";
import "./Button.css";

const Button = ({
  children,
  onClick,
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`custom-button ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
