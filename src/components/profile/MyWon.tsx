import { useEffect, useState } from "react";
import type { Auction, User } from "../../types/types";
import { fetchUsersAuctions } from "../../hooks/getUsersAuctions";
import Card from "../cards/Card";
import { Bidder } from "../../hooks/getBidderInfo";
import { fetchCurrentUser } from "../../hooks/getCurrentUser";

const MyAuctions = () => {
  const [auction, setAuction] = useState<Auction[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const user = await fetchCurrentUser();
        setCurrentUser(user);
      } catch (error) {
        console.log(error);
      }
    };
    loadCurrentUser();
  });

  useEffect(() => {
    const loadBiddingAuctions = async () => {
      try {
        const data = await Bidder.getCurrentlyBidding();
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
        (a) => currentUser?.id === a.highestBidder && a.status === "ENDED"
      ) ? (
        <div className="grid grid-cols-6 gap-5 justify-items-start">
          {auction.map(
            (auctionItem) =>
              currentUser?.id === auctionItem.highestBidder &&
              auctionItem.status === "ENDED" && (
                <Card
                  key={auctionItem.id}
                  auction={auctionItem}
                  refreshAuctions={refreshAuctions}
                />
              )
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)]">
          <p className="text-center text-[32px] font-bold text-(--text-primary)">
            Nothing here yet?
          </p>
          <p className="text-center text-[16px] font-light text-(--text-gray)">
            When you win auction items <br />
            will be displayed here! Go on <br />
            and bid on your favorite <br />
            items!
          </p>
        </div>
      )}
    </>
  );
};

export default MyAuctions;
