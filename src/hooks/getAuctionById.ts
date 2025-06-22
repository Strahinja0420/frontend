import axios from "axios";

export const auctionAPI = {
  async getAuctionById(id : number) {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(`http://localhost:5000/auctions/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.data || typeof response.data !== "object") {
        throw new Error("Invalid auction data received");
      }
      

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || "Failed to fetch auction by ID."
        );
      }
      throw error;
    }
  },
};
