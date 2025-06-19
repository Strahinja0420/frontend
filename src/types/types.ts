export interface Auction {
  id: number;

  creatorId?: number;

  title: string;

  startingBid: number;

  images: string;

  endTime?: string;

  edit?: boolean;
}

export interface User {
  id: number;

  firstName: string;

  lastName: string;
}
