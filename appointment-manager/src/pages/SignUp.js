import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { signUpUser } from "../services/api";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const name = e.target?.name || e.originalEvent?.target?.name;
    const value = e.target?.value || e.value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "",
      }));
    }
    if (apiError) setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Optional contact number validation (if provided)
    if (formData.contactNumber && !/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      const userData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        gender: formData.gender,
        email: formData.email,
        password: formData.password,
        contact_number: formData.contactNumber || undefined,
      };

      const response = await signUpUser(userData);
      console.log("Signup successful:", response);

      // Show success message or handle response as needed
      if (response.status === 201 || response.status === 200) {
        // Redirect to login page
        navigate("/login");
      } else {
        setApiError("Unexpected response from server");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setApiError(
        error.response?.data?.message || "Failed to sign up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const genderOptions = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Other", value: "Other" },
  ];

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>

        {apiError && <div className="api-error">{apiError}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <InputText
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={errors.firstName ? "p-invalid" : ""}
              placeholder="First Name *"
            />
            {errors.firstName && (
              <small className="p-error">{errors.firstName}</small>
            )}
          </div>

          <div className="form-group">
            <InputText
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={errors.lastName ? "p-invalid" : ""}
              placeholder="Last Name *"
            />
            {errors.lastName && (
              <small className="p-error">{errors.lastName}</small>
            )}
          </div>
          <div className="form-group">
            <Dropdown
              name="gender"
              value={formData.gender}
              options={genderOptions}
              onChange={handleChange}
              placeholder="Gender *"
              className={errors.gender ? "p-invalid" : ""}
            />
            {errors.gender && (
              <small className="p-error">{errors.gender}</small>
            )}
          </div>
          <div className="form-group">
            <InputText
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "p-invalid" : ""}
              placeholder="Email *"
            />
            {errors.email && <small className="p-error">{errors.email}</small>}
          </div>

          <div className="form-group">
            <InputText
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              className={errors.contactNumber ? "p-invalid" : ""}
              placeholder="Contact Number"
            />
            {errors.contactNumber && (
              <small className="p-error">{errors.contactNumber}</small>
            )}
          </div>

          <div className="form-group">
            <Password
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "p-invalid" : ""}
              placeholder="Password *"
              toggleMask
              feedback={false}
            />
            {errors.password && (
              <small className="p-error">{errors.password}</small>
            )}
          </div>

          <div className="form-group ">
            <Password
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "p-invalid" : ""}
              placeholder="Confirm Password *"
              toggleMask
              feedback={false}
            />
            {errors.confirmPassword && (
              <small className="p-error">{errors.confirmPassword}</small>
            )}
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
