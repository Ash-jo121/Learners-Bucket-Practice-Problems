import axios from "axios";
import authService from "./authService";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api/";

const apiService = axios.create({
  baseUrl: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiService.interceptors.request.use(
  (config) => {
    const token = authService.getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      authService.logout();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiService;
