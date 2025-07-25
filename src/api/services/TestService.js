import apiClient from "../config/apiClient";
import { handleApiError } from "../utils/handleApiErrors";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

const TestService = {
  async getTest(cardId, level) {
    try {
      const token = getAuthToken();
      if (!token) throw new Error("No authentication token found");

      const response = await apiClient.post(
        "/cards/board/test/",
        {
          card_id: cardId,
          level: level
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting test:", error);
      throw handleApiError(error);
    }
  }
};

export default TestService;
