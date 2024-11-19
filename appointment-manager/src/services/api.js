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
    console.log("Sending signup request:", userData);

    const response = await axiosInstance.post("/auth/signup", userData);
    return response;
  } catch (error) {
    console.error("Signup error details:", error.response || error);
    throw error;
  }
};
