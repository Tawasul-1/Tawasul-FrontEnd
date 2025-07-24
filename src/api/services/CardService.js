import apiClient from "../config/apiClient";
import { handleApiError } from "../utils/handleApiErrors";

const CardService = {
  async addNewCard(formData) {
    try {
      const response = await apiClient.post("/cards/cards/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      console.error("Error adding new card:", error);
      throw handleApiError(error);
    }
  },

  async deleteCard(cardId) {
    try {
      const response = await apiClient.delete(`/cards/cards/${cardId}/`);
      return response;
    } catch (error) {
      console.error("Error deleting card:", error);
      throw handleApiError(error);
    }
  },

  async getUserCards() {
    try {
      const response = await apiClient.get("/cards/cards/?limit=100");
      return response;
    } catch (error) {
      console.error("Error fetching user cards:", error);
      throw handleApiError(error);
    }
  },

  async addCardToBoard(title) {
    try {
      const response = await apiClient.post("/cards/board/add/", { title });
      return response;
    } catch (error) {
      console.error("Error adding card to board:", error);
      throw handleApiError(error);
    }
  },

  async removeCardFromBoard(title) {
    try {
      const response = await apiClient.delete("/cards/board/remove/", { data: { title } });
      return response;
    } catch (error) {
      console.error("Error removing card from board:", error);
      throw handleApiError(error);
    }
  },

  async getBoardCards() {
    try {
      const response = await apiClient.get("/cards/board/");
      return response;
    } catch (error) {
      console.error("Error fetching board cards:", error);
      throw handleApiError(error);
    }
  },

  async getBoardWithCategories(categoryId = null) {
    try {
      const url = categoryId
        ? `/cards/board/with-categories/?category_id=${categoryId}`
        : "/cards/board/with-categories/";
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching board with categories:", error);
      throw handleApiError(error);
    }
  },
};

export default CardService;
