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
      const response = await apiClient.get("/cards/cards/");
      return response;
    } catch (error) {
      console.error("Error fetching user cards:", error);
      throw handleApiError(error);
    }
  },

    async addCardToBoard(cardId) {
  try {
    const response = await apiClient.post("/cards/board/add/", { id: cardId });
    return response;
  } catch (error) {
    console.error("Error adding card to board:", error);
    throw handleApiError(error);
  }
},

async removeCardFromBoard(cardId) {
  try {
    const response = await apiClient.delete("/cards/board/remove/", {
      data: { id: cardId },
    });
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

async getBoardCards() {
  try {
    const response = await apiClient.get("/cards/board/");
    return response;
  } catch (error) {
    console.error("Error fetching board cards:", error);
    throw handleApiError(error);
  }
},

async getAllCards(categoryId = null, search = "") {
  try {
    let url = "/cards/cards/";

    const params = new URLSearchParams();

    if (categoryId) params.append("category_id", categoryId);
    if (search) params.append("search", search);

    if ([...params].length > 0) {
      url += `?${params.toString()}`;
    }

    const response = await apiClient.get(url);
    return response;
  } catch (error) {
    console.error("Error fetching board with categories:", error);
    throw handleApiError(error);
  }
}
,

    async getBoardCards(categoryId = null) {
    try {
      const url = categoryId
        ? `/cards/board/?category_id=${categoryId}`
        : "/cards/board/";
      const response = await apiClient.get(url);
      return response;
    } catch (error) {
      console.error("Error fetching board with categories:", error);
      throw handleApiError(error);
    }
  },


async verifyPin(pin) {
    try {
      const response = await apiClient.post("/cards/verify-pin/", {
        pin: pin,
      });
      return response.data; 
    } catch (error) {
      console.error("Error verifying PIN:", error);
      throw handleApiError(error);
    }
  },
  };


export default CardService;
