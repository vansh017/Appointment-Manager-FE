import axios from "axios";

const API_BASE_URL = "http://localhost:3500";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const signUpUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/signup", userData);
    return response;
  } catch (error) {
    console.error("Signup error details:", error.response || error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const credentials = `${userData.email}:${userData.password}`;
    const encodedCredentials = btoa(credentials);
    const data = { user: encodedCredentials };
    const response = await axiosInstance.post("/auth/login", data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/otp", userData);
    return response;
  } catch (error) {
    console.error("Signup error details:", error.response || error);
    throw error;
  }
};
