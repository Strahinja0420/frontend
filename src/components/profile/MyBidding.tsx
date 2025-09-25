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
        // console.log(data);
        
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
      {auction.some(
        (a) =>  a.status !== "ENDED"
      ) ? (
        <div className="grid grid-cols-6 gap-5 justify-items-start">
          {auction.map(
            (auctionItem) =>
              
              auctionItem.status !== "ENDED" && (
                <Card
                  key={auctionItem.id}
                  auction={auctionItem}
                  refreshAuctions={refreshAuctions}
                />
              )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full pt-6 text-center">
          <p className="text-center text-[32px] font-bold text-(--text-primary)">
            No bidding in progress!
          </p>
          <p className="text-center text-[16px] font-light text-(--text-gray)">
            Start bidding by finding new items you <br />
            like on "Auction" page! <br />
          </p>
        </div>
      )}
    </>
  );
};

export default MyAuctions;
