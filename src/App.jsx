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
      return localStorage.getItem("authToken");
    };

    const onUnauthenticated = () => {
      console.log("User is unauthenticated");
    };

    setupRequestInterceptor(apiClient, getAuthToken);
    setupResponseInterceptor(apiClient, onUnauthenticated);
  }, []);

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;
