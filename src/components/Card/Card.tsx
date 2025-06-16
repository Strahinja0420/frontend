import React from "react";
import type { Auction } from "../../types/types";
import OutbidSmall from "../Tags/Outbid/OutbidSmall";

interface AuctionCardProps {
  auction: Auction;
}

const Card: React.FC<AuctionCardProps> = ({ auction }) => {
  return (
    <>
      <div className="grid grid-cols-6 gap-0 h-[250px] min-h-[250px] w-[216px] min-w-[216px] bg-white rounded-[16px]   align-middle ">
        <div className="col-start-1 col-end-3 flex items-center justify-start pl-[8px] ">
            <OutbidSmall/>
        </div>
        <div className="col-span-2 col-end-7 px-[8px] py-[4px] text-primary">
          {new Date(auction.endTime).toLocaleDateString()}
        </div>
        <div className="col-span-7 px-[8px] py-[4px]  text-primary">
          {auction.name}
        </div>
        <div className="col-start-1 col-end-3 px-[8px] py-[4px]  text-primary font-bold">
          {auction.price}€
        </div>
        <div className="col-start-1 col-end-7 h-[150px] px-[8px] py-[4px]  text-primary">
          <img className="rounded-[8px]" src={auction.image}></img>
        </div>
      </div>
    </>
  );
};

export default Card;
