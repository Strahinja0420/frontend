import axios from "axios";
import type { updateAuctionData } from "../types/authTypes";

export const updateAuctionAPI = {
  async update(auctionId: number, credentials: updateAuctionData) {
    try {
      const token = localStorage.getItem("token");

       const payload = {
        id: auctionId,
        ...credentials
       }

       console.log(payload);
       
      

       await axios.patch(`http://localhost:5000/auctions/update`, payload, {
        headers: {
          "Content-Type" : "multipart/form-data",
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
