import apiClient from "../config/apiClient";
import { handleApiError } from "../utils/handleApiErrors";

const BoardService = {
  async getBoardWithCategories(categoryId = null) {
    try {
      console.log(categoryId);
      const url = categoryId
        ? `/cards/board/with-categories/?category_id=${categoryId}`
        : "/cards/board/with-categories/";
      const response = await apiClient.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching board with categories:", error);
      throw handleApiError(error);
    }
  },
  verifyPin: async (pin) => {
    const formData = new FormData();
    console.log("Form pin", pin)
    formData.append("pin", pin);

    const response = await apiClient.post("/cards/verify-pin/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  },
};

export default BoardService;
