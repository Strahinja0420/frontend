import { useEffect, useState } from "react";
import type { Auction, User } from "../../types/types";
import { fetchUsersAuctions } from "../../hooks/getUsersAuctions";
import Card from "../cards/Card";
import { Bidder } from "../../hooks/getBidderInfo";

const MyAuctions = () => {
  const [auction, setAuction] = useState<Auction[]>([]);

  useEffect(() => {
    const loadBiddingAuctions = async () => {
      try {
        const data = await Bidder.getCurrentlyBidding();
        console.log(data);
        
        setAuction(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadBiddingAuctions();
  }, []);

  const refreshAuctions = async () => {
    const data = await fetchUsersAuctions();
    setAuction(data);
  };

  return (
    <>
      {auction.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)] ">
          <p className="text-center text-[32px] font-bold text-(--text-primary)">
            No bidding in progress!
          </p>
          <p className="text-center text-[16px] font-light text-(--text-gray)">
           Start bidding by finding new items you <br />
            like on "Auction" page! 
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-5 justify-items-start">
          {auction.map((auction) => (
            <Card
              key={auction.id}
              auction={auction}
              refreshAuctions={refreshAuctions}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MyAuctions;
