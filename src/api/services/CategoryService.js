import apiClient from "../config/apiClient";

const CategoryService = {
  async getAllCategories() {
    try {
      const response = await apiClient.get("/cards/categories/");
      return response; // Return the full axios response object
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};

export default CategoryService;
