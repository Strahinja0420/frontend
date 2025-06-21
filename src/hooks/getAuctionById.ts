export const fetchAuctionById = async (auctionId: number) => {
  try {
    const response = await fetch(`http://localhost:5000/auctions/${auctionId}`);
    if (!response.ok) {
      throw new Error('Auction not found');
    }
    return response.json();
  } catch (error) {
    console.error(`Error fetching auction:${auctionId}`, error);
  }
};