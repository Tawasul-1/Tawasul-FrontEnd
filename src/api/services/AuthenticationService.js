import BaseService from "./BaseService";
import axios from "axios";

class AuthenticationService extends BaseService {
  constructor() {
    super("/users");
  }

  async register(userData) {
    try {
      console.log("Registering user with data:", userData);
      console.log("Base URL:", this.apiClient.defaults.baseURL);
      console.log("Endpoint:", this.endpoint);
      console.log("Full URL:", `${this.apiClient.defaults.baseURL}${this.endpoint}/register/`);

      // Check if userData is FormData (for file uploads)
      const isFormData = userData instanceof FormData;
      console.log("Is FormData:", isFormData);

      if (isFormData) {
        console.log("FormData contents:");
        for (let [key, value] of userData.entries()) {
          console.log(
            `${key}:`,
            value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value
          );
        }
      }

      // For FormData, don't set Content-Type header - let browser set it automatically
      const config = {
        timeout: 10000,
      };

      if (!isFormData) {
        config.headers = { "Content-Type": "application/json" };
      }

      let response;
      if (isFormData) {
        // For FormData, create a temporary axios instance without default headers
        const tempAxios = axios.create({
          baseURL: this.apiClient.defaults.baseURL,
          timeout: 10000,
        });
        response = await tempAxios.post(`${this.endpoint}/register/`, userData);
      } else {
        response = await this.apiClient.post(`${this.endpoint}/register/`, userData, config);
      }

      console.log("Registration response:", response.data);
      return response;
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      console.error("Full error object:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error headers:", error.response?.headers);
      console.error("Request config:", error.config);
      console.error("Response data:", error.response?.data);
      console.error("Response text:", error.response?.data?.toString());
      throw error;
    }
  }

  async login(credentials) {
    try {
      console.log("Logging in with credentials:", credentials);
      console.log("Full URL:", `${this.apiClient.defaults.baseURL}${this.endpoint}/login/`);

      const response = await this.apiClient.post(`${this.endpoint}/login/`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("Login response:", response.data);
      return response;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      console.error("Full error object:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error headers:", error.response?.headers);
      console.error("Request config:", error.config);
      throw error;
    }
  }

  async verifyEmail(token, uid = null) {
    try {
      console.log("Verifying email with token:", token, "and uid:", uid);
      
      // Based on the URL format, it seems like the backend expects the token in the URL path
      // URL format: /users/activate/{token}/
      const endpoint = uid ? `${this.endpoint}/verify-email/` : `${this.endpoint}/activate/${token}/`;
      
      console.log("Full URL:", `${this.apiClient.defaults.baseURL}${endpoint}`);

      let response;
      if (uid) {
        // If uid is provided, send as POST with body
        response = await this.apiClient.post(endpoint, {
          token: token,
          uid: uid,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        });
      } else {
        // If no uid, make a GET request to the activation endpoint
        response = await this.apiClient.get(endpoint, {
          timeout: 10000,
        });
      }

      console.log("Email verification response:", response.data);
      return response;
    } catch (error) {
      console.error("Email verification error:", error.response?.data || error.message);
      console.error("Full error object:", error);
      console.error("Error status:", error.response?.status);
      throw error;
    }
  }

  async resendVerification(email) {
    try {
      console.log("Resending verification email to:", email);
      console.log(
        "Full URL:",
        `${this.apiClient.defaults.baseURL}${this.endpoint}/resend-verification/`
      );

      const response = await this.apiClient.post(
        `${this.endpoint}/resend-verification/`,
        {
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 10000,
        }
      );

      console.log("Resend verification response:", response.data);
      return response;
    } catch (error) {
      console.error("Resend verification error:", error.response?.data || error.message);
      console.error("Full error object:", error);
      console.error("Error status:", error.response?.status);
      throw error;
    }
  }
}

const authService = new AuthenticationService();
export { authService };
