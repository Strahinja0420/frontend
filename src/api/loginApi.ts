import axios from "axios";
import type { LoginFormData } from "../types/authTypes";

export const loginAPI = {

  async login(credentials: LoginFormData) {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/login`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response.data);
      
      const token = response.data.access_token;

      if (token) {
        localStorage.setItem("token", token);

        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.message || "Login failed. Please try again"
        );
      }
      throw error;
    }
  },
};
