export interface Auction {
  id: number;

  creatorId?: number;

  title: string;

  startingBid: number;

  images: string;

  endTime?: string;

  edit?: boolean;

  description: string;

  bids: Bid[];

  creator: {
    id: number;
    username: null;
    firstName: string;
    lastName: string;
  };

  _count: {
    createdAuctions: number;
    bids: number;
  };
}

export interface User {
  id: number;

  firstName: string;
  lastName: string;

  email: string;

  _count: {
    createdAuctions: number;
    bids: number;
  };
}

export interface Bid {
  id: number;
  amount: number;
  auctionId: number;
  bidderId: number;
  createdAt: string;
  bidder?: User;
}
