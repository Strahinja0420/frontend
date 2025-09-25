import axios from "axios";
import type { RegistrationPayload } from "../components/auth/RegisterForm";

export const registerAPI = {
  async register(credentials: RegistrationPayload) {
    try {
      const response = await axios.post(
        `http://localhost:5000/auth/register`,
        credentials,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      console.log("Registration API response:", response.data);
      
      const token = response.data.token;
      
      if (token) {
        localStorage.removeItem("token");
        localStorage.setItem("token", token);
        console.log("Token stored in localStorage");
      } else {
        console.warn("No token received from server");
      }

      return response.data;
      
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