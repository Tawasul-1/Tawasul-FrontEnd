import apiClient from "../config/apiClient";
import { handleApiError } from "../utils/handleApiErrors";

class SubscriptionService {
  static async getSubscription() {
    try {
      const response = await apiClient.get("/users/subscription/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching subscription status:", error);
      throw handleApiError(error);
    }
  }

  static async cancelSubscription() {
    try {
      const response = await apiClient.post(
        "/users/subscription/cancel/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error cancelling subscription:", error);
      throw handleApiError(error);
    }
  }

  static async initiatePayment() {
    try {
      const response = await apiClient.get(
        "/users/payment/init/",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error initiating payment:", error);
      throw handleApiError(error);
    }
  }
}

export default SubscriptionService; 