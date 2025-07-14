export const setupRequestInterceptor = (apiClient, getAuthToken) => {
  apiClient.interceptors.request.use(
    (config) => {
      const token = getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
        onUnauthenticated();
      }
      return Promise.reject(error);
    }
  );
};
