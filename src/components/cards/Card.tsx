import React from "react";
import type { Auction } from "../../types/types";
import OutbidSmall from "../Tags/SmallTag";
import SmallTimeTag from "../TimeTags/SmallTimeTag";

interface AuctionCardProps {
  auction: Auction;
}

const Card: React.FC<AuctionCardProps> = ({ auction }) => {
  function getHoursDifference(startTime: Date, endTime: Date): number {
  const diffInMs = endTime.getTime() - startTime.getTime();
  const diffInHours = diffInMs / (1000 * 60 * 60);
  return diffInHours;
}

  const currentTime = new Date();
  if (!auction.endTime) {
    throw new Error('Date string cannot be undefined');
  }
  const endTime = new Date(auction.endTime)

  console.log('Rendering card with auction:', auction);
  return (
    <>
      <div className="grid grid-cols-6 gap-0 h-[250px] min-h-[250px] w-[216px] min-w-[216px] bg-white rounded-[16px] align-middle overflow-hidden shadow-2xl ">
        <div className="col-start-1 col-end-3 flex items-center justify-start pl-[8px] ">
            <OutbidSmall/>
        </div>
        <div className="col-span-2 col-end-7 px-[8px] py-[4px] text-primary">
           { (getHoursDifference(currentTime,endTime)) > 24 
           ? <SmallTimeTag time={"24h"} />
           : <SmallTimeTag time={"2d"}/>
           }
        </div>
        <div className="col-span-7 px-[8px] py-[4px]  text-primary">
          {auction.title}
        </div>
        <div className="col-start-1 col-end-3 px-[8px] py-[4px]  text-primary font-bold">
          {auction.startingBid}€
        </div>
        <div className="col-start-1 col-end-7 h-[150px] px-[8px] py-[4px]  text-primary">
          <img className="rounded-[8px] w-full h-full object-cover" 
          src={`http://localhost:5000/auctions/getimage/${auction.images}`}>
            </img>
        </div>
      </div>
    </>
  );
};

export default Card;
