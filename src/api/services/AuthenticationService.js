import BaseService from "./BaseService";
import { handleApiError } from "../utils/handleApiErrors";

class AuthenticationService extends BaseService {
  constructor() {
    super("/users");
  }

  async register(userData) {
    const isFormData = userData instanceof FormData;

    let config = {};
    if (isFormData) {
      // FormData handling - no additional logging needed
    } else {
      config = {
        baseURL: this.apiClient.defaults.baseURL,
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    try {
      const response = await this.apiClient.post(`${this.endpoint}/register/`, userData, config);
      return response;
    } catch (error) {
      console.error("Registration error:", error);
      throw handleApiError(error);
    }
  }

  async login(credentials) {
    try {
      const response = await this.apiClient.post(`${this.endpoint}/login/`, credentials, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Login error:", error);
      throw handleApiError(error);
    }
  }

  async verifyEmail(token, uid) {
    const endpoint = `${this.endpoint}/verify-email/`;

    try {
      const response = await this.apiClient.post(endpoint, {
        token: token,
        uid: uid,
      });
      return response;
    } catch (error) {
      console.error("Email verification error:", error);
      throw handleApiError(error);
    }
  }

  async resendVerificationEmail(email) {
    try {
      const response = await this.apiClient.post(`${this.endpoint}/resend-verification/`, {
        email: email,
      });
      return response;
    } catch (error) {
      console.error("Resend verification error:", error);
      throw handleApiError(error);
    }
  }

  async requestPasswordReset(email) {
    try {
      const response = await this.apiClient.post(`${this.endpoint}/password-reset/`, {
        email: email,
      });
      return response;
    } catch (error) {
      console.error("Password reset request error:", error);
      throw handleApiError(error);
    }
  }

  async resetPassword(token, password, password2) {
    try {
      const response = await this.apiClient.post(`${this.endpoint}/password-reset/${token}/`, {
        password: password,
        password2: password2,
      });
      return response;
    } catch (error) {
      console.error("Password reset error:", error);
      throw handleApiError(error);
    }
  }
}

const authService = new AuthenticationService();
export { authService };
