export const setupRequestInterceptor = (apiClient, getAuthToken) => {
  apiClient.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      console.log("Request interceptor - Token retrieved:", token ? "Token exists" : "No token");
      console.log("Request URL:", config.url);
      console.log("Request headers before:", config.headers);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log("Authorization header added:", `Bearer ${token}`);
      } else {
        console.log("No token found, skipping Authorization header");
      }

      console.log("Request headers after:", config.headers);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const setupResponseInterceptor = (apiClient, onUnauthenticated) => {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.log("401 Unauthorized response received");
        onUnauthenticated();
      }
      return Promise.reject(error);
    }
  );
};
