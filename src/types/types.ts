export interface Auction {
  id: number;

  title: string;

  buyNowPrice: number;

  images: string;

  endTime?: string ;

  edit?: boolean;
}
