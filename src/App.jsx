import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import apiClient from "./api/config/apiClient";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "./api/interceptors/requestInterceptors";

function App() {
  useEffect(() => {
    const getAuthToken = () => {
      const token = localStorage.getItem("authToken");
      console.log("getAuthToken called, token:", token ? "Token exists" : "No token");
      return token;
    };

    const onUnauthenticated = () => {
      console.log("User is unauthenticated");
      // Clear localStorage and redirect to login
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    };

    setupRequestInterceptor(apiClient, getAuthToken);
    setupResponseInterceptor(apiClient, onUnauthenticated);
  }, []);

  return <AppRouter />;
}

export default App;
