import axios from "axios";
import type { addAuctionData } from "../types/authTypes";

export const addAuctionAPI = {
  async addAuction(credentials: addAuctionData) {
    try {
      const token = localStorage.getItem("token");

      

      const payload = {
        ...credentials,
        endTime: new Date(credentials.endTime).toISOString()
      }

       console.log(payload);
      

       await axios.post(`http://localhost:5000/auctions`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }); 
      //   console.log(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data.message || "Auction update failed."
        );
      }
      throw error;
    }
  },
};
