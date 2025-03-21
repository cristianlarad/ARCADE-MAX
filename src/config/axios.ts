import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://arcade-max-api-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
