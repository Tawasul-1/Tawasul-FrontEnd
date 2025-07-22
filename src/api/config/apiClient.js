import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  // Do not set Content-Type globally here
});

// Add a request interceptor to set Content-Type only for non-FormData
apiClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    // Let Axios set the Content-Type (multipart/form-data with boundary)
    if (config.headers && config.headers["Content-Type"]) {
      delete config.headers["Content-Type"];
    }
  } else {
    config.headers = config.headers || {};
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

export default apiClient;
