import { type Auction } from "../types/types";

export const fetchAuctions = async (): Promise<Auction[]> => {
  try {
    const response = await fetch('http://localhost:5000/auctions');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Fetched data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching auctions:', error);
    return [];
  }
};