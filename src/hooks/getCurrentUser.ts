import axios from "../api/axios";
import type { User } from "../types/types";

type Earnings = {
  _sum: {
    currentBid: number;
  };
};

export const Users = {
  async fetchCurrentUser() {
    try {
      const token = localStorage.getItem("token");
      // console.log(localStorage);

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch("http://localhost:5000/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Network response was not ok (status: ${response.status})`
        );
      }

      const data: User = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch current user:", error);

      // Re-throw with more context if needed
      if (error instanceof Error) {
        throw new Error(`Failed to fetch user: ${error.message}`);
      }
      throw new Error("Failed to fetch user due to an unknown error");
    }
  },

  async earnings(){
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get<{_sum:{currentBid : number}}>(
        "http://localhost:5000/auctions/earnings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //  console.log( response.data);
      
      return response.data._sum.currentBid ?? 0
    } catch (error) {
      console.error("Error fetching auction earnings:", error);
      throw error;
    }
  },
};
