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

if (localStorage.getItem("token")) {
  axiosInstance.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
}

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

export const saveShopDetails = async (shopDetails, userId) => {
  try {
    const response = await axiosInstance.post(
      `${API_URLS.CREATE_SHOP}`,
      shopDetails,
      {
        params: {
          user_id: userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while saving shop data:", error.response || error);
    throw error;
  }
};

export const getShopList = async (userId, userRole) => {
  try {
    const response = await axiosInstance.get(API_URLS.SHOP, {
      params: { user_id: userId, role: userRole }, // Query parameters
    });
    return response.data; // Return only the data from the response
  } catch (error) {
    console.error("Error fetching user data by ID:", error.response || error);
    throw error;
  }
};

export const getShopMenu = async (userId, shopId) => {
  try {
    const response = await axiosInstance.get(API_URLS.SHOP_MENU, {
      params: { user_id: userId, shop_id: shopId }, // Query parameters
    });
    return response.data; // Return only the data from the response
  } catch (error) {
    console.error("Error fetching user data by ID:", error.response || error);
    throw error;
  }
};

export const addShopMenu = async (itemDetails, userId) => {
  try {
    const response = await axiosInstance.post(
      `${API_URLS.CREATE_MENU}`,
      itemDetails,
      {
        params: {
          user_id: userId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error while saving shop data:", error.response || error);
    throw error;
  }
};
