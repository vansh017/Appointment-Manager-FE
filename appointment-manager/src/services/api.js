import axios from "axios";
import API_URLS from "./api-constants";

const API_BASE_URL = "http://localhost:3500";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
    }

    // Handle other errors
    return Promise.reject(error.response?.data || error);
  }
);

export const signUpUser = async (userData) => {
  try {
    const response = await axiosInstance.post(API_URLS.SIGN_UP, userData);
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
    const response = await axiosInstance.post(API_URLS.LOGIN, data);
    return response;
  } catch (error) {
    throw error;
  }
};

export const verifyOtp = async (userData) => {
  try {
    const response = await axiosInstance.post(API_URLS.OTP, userData);
    return response.data;
  } catch (error) {
    console.error("Signup error details:", error.response || error);
    throw error;
  }
};

export const getUserData = async (userId) => {
  try {
    const response = await axiosInstance.get(API_URLS.USER, {
      params: { user_id: userId }, // Query parameters
    });
    return response.data; // Return only the data from the response
  } catch (error) {
    console.error("Error fetching user data by ID:", error.response || error);
    throw error;
  }
};
