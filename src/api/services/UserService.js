import apiClient from "../config/apiClient";

class UserService {
  static async getProfile() {
    try {
      const response = await apiClient.get("/users/profile/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw handleApiError(error);
    }
  }

  static async updateProfile(profileData) {
    try {
      const response = await apiClient.put("/users/profile/", profileData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      return response;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw handleApiError(error);
    }
  }
}

const userService = {
  getProfile: UserService.getProfile,
  updateProfile: UserService.updateProfile,
};

export { userService };
