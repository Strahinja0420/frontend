import axios from "axios";
import type { UpdatePasswordData, UpdateUserData } from "../types/authTypes";

export const changePasswordAPI = {
  async update(credentials: UpdatePasswordData) {

    const token = localStorage.getItem("token")
    try {
      const response = await axios.patch(
        `http://localhost:5000/users/update-password`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to update profile"
        );
      }
      throw error;
    }
  },
};
