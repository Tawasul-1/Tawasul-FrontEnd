import { useEffect } from "react";
import AppRouter from "./router/AppRouter";
import apiClient from "./api/config/apiClient";
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from "./api/interceptors/requestInterceptors";
import { LanguageProvider } from "./context/LanguageContext";

function App() {
  useEffect(() => {
    const getAuthToken = () => {
      const token = localStorage.getItem("authToken");
      return token;
    };

    const onUnauthenticated = () => {
      // Clear localStorage and redirect to login
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    };

    setupRequestInterceptor(apiClient, getAuthToken);
    setupResponseInterceptor(apiClient, onUnauthenticated);
  }, []);

  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
}

export default App;
