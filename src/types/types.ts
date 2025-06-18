export interface Auction {
  id: number;

  title: string;

  startingBid: number;

  images: string;

  endTime?: string ;

  edit?: boolean;
}
