import apiClient from "../config/apiClient";
import { handleApiError } from "../utils/handleApiErrors";

const CategoryService = {
  async getAllCategories() {
    try {
      const response = await apiClient.get("/cards/categories/");
      return response; // Return the full axios response object
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw handleApiError(error);
    }
  },
};

export default CategoryService;
