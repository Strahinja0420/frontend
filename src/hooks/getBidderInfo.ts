import axios from 'axios';

export const Bidder = {
  async getBidderInfo(bidderId: number) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/users/bidder/${bidderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 'Failed to fetch bidder info'
        );
      }
      throw error;
    }
  },
};