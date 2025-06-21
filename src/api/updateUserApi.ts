import axios from "axios";
import type { UpdateUserData } from "../types/authTypes";

export const updateUserAPI = {
  async update(credentials: UpdateUserData) {

    const token = localStorage.getItem("token")
    try {
      const response = await axios.patch(
        `http://localhost:5000/users/profile`,
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
