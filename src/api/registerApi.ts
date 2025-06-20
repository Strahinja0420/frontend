import axios from "axios";
import type { RegisterFormData } from "../types/authTypes";
import type { RegistrationPayload } from "../components/auth/RegisterForm";

export const registerAPI = {
  async register(credentials: RegistrationPayload) {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/register`,
        credentials,
        {
          headers: { "Content-Type ": "application/json" },
        }
      );

      const token = response.data.token;
      console.log("token");
      

      if (token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", token);

        return response.data;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Full error response:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });
        throw new Error(error.response?.data?.message || "Registration failed");
      }
      throw error;
    }
  },
};
