import { useEffect, useState } from "react";
import type { Auction } from "../../types/types";
import { fetchUsersAuctions } from "../../hooks/getUsersAuctions";
import Card from "../cards/Card";

const MyAuctions = () => {
  const [auction, setAuction] = useState<Auction[]>([]);

  useEffect(() => {
    const loadMyAuctions = async () => {
      try {
        const data = await fetchUsersAuctions();
        // console.log(data);

        setAuction(data);
      } catch (error) {
        console.log(error);
      }
    };

    loadMyAuctions();
  }, []);

  const refreshAuctions = async () => {
    const data = await fetchUsersAuctions();
    setAuction(data);
  };

  // console.log(auction);
  

  return (
    <>
      {auction.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)] ">
          <p className="text-center text-[32px] font-bold text-(--text-primary)">
            Oh no, no auctions added!
          </p>
          <p className="text-center text-[16px] font-light text-(--text-gray)">
            To add a new auction click "+" button in <br />
            navigation bar and new auctions will be <br />
            added here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-5 justify-items-start">
          {auction.map((auction) => (
            <Card
              key={auction.id}
              auction={auction}
              isCurrentUserOwner
              refreshAuctions={refreshAuctions}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default MyAuctions;
