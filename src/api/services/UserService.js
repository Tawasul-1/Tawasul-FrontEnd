import apiClient from "../config/apiClient";

class UserService {
  static async getProfile() {
    try {
      console.log("Fetching user profile");
      console.log("apiClient:", apiClient);
      console.log("apiClient.defaults:", apiClient?.defaults);
      console.log("Full URL:", `${apiClient.defaults.baseURL}/users/profile/`);

      const response = await apiClient.get("/users/profile/", {
        timeout: 10000,
      });

      console.log("Profile response:", response.data);
      return response;
    } catch (error) {
      console.error("Get profile error:", error.response?.data || error.message);
      console.error("Full error object:", error);
      console.error("Error status:", error.response?.status);
      throw error;
    }
  }

  static async updateProfile(profileData) {
    try {
      console.log("Updating user profile with data:", profileData);
      console.log("Full URL:", `${apiClient.defaults.baseURL}/users/profile/`);

      const response = await apiClient.put("/users/profile/", profileData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("Update profile response:", response.data);
      return response;
    } catch (error) {
      console.error("Update profile error:", error.response?.data || error.message);
      console.error("Full error object:", error);
      console.error("Error status:", error.response?.status);
      throw error;
    }
  }
}

const userService = {
  getProfile: UserService.getProfile,
  updateProfile: UserService.updateProfile,
};

export { userService };
