import Card from "./Card";
import type { Auction } from "../../types/types";

const CardGroup = () => {
  const exampleAuctions: Auction[] = [
    {
      id: 1,
      title: "Vintage Leica M3 Camera",
      description: "1954 German-made rangefinder camera in excellent condition",
      startingBid: 1200,
      currentBid: 1850,
      images: "leica_m3.jpg",
      status: "ACTIVE",
      highestBidder: 42,
      endTime: "2025-06-30T00:00:00Z",
      edit: false,
      creatorId: 101,
    },
    {
      id: 2,
      title: "Signed Michael Jordan Rookie Card",
      description: "1986 Fleer graded PSA 9 with certificate of authenticity",
      startingBid: 5000,
      currentBid: 7200,
      images: "jordan_rookie.jpg",
      status: "ACTIVE",
      highestBidder: 87,
      endTime: "2025-06-29T00:00:00Z", 
      edit: false,
      creatorId: 102,
    },
    {
      id: 3,
      title: "Rolex Submariner 16610",
      description: "2001 model with box and papers, recently serviced",
      startingBid: 8500,
      currentBid: 9200,
      images: "rolex_submariner.jpg",
      status: "ACTIVE",
      highestBidder: 15,
      endTime: "2025-06-28T00:00:00Z", 
      edit: false,
      creatorId: 103,
    },
    {
      id: 4,
      title: "First Edition Harry Potter Set",
      description: "Complete UK first editions, all in fine condition",
      startingBid: 3000,
      currentBid: 4200,
      images: "harry_potter_set.jpg",
      status: "ACTIVE",
      highestBidder: 56,
      endTime: "2025-06-26T16:24:00Z",
      edit: false,
      creatorId: 104,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 justify-items-center">
      {exampleAuctions.map((auction) => (
        <Card key={auction.id} auction={auction} />
      ))}
    </div>
  );
};

export default CardGroup;
