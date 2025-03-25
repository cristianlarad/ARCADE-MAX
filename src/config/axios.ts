import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token y manejar headers dinámicos
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Permitir sobrescribir headers si se pasan en la configuración
  if (config.customHeaders && Object.keys(config.customHeaders).length > 0) {
    Object.entries(config.customHeaders).forEach(([key, value]) => {
      // Usar método seguro para establecer headers
      config.headers.set(key, value);
    });
  }

  return config;
});

// Extender tipos de configuración para soportar headers personalizados
declare module "axios" {
  interface AxiosRequestConfig {
    customHeaders?: Record<string, string>;
  }
}
