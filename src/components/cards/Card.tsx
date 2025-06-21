import React, { useState } from "react";
import type { Auction } from "../../types/types";
import OutbidSmall from "../Tags/SmallTag";
import SmallTimeTag from "../TimeTags/SmallTimeTag";
import EditAuction from "../pop-ups/EditAuction";

interface AuctionCardProps {
  auction: Auction;
  isCurrentUserOwner?: boolean;
  refreshAuctions?: () => Promise<void>;
}

const Card: React.FC<AuctionCardProps> = ({
  auction,
  isCurrentUserOwner,
  refreshAuctions,
}) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const getHoursDifference = (startTime: Date, endTime: Date): number =>
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  const currentTime = new Date();
  if (!auction.endTime) {
    throw new Error("Date string cannot be undefined");
  }
  const endTime = new Date(auction.endTime);
  const isAuctionActive = currentTime < endTime;

  // console.log("Rendering card with auction:", auction);

  const handleDeleteAuction = async (auctionId: number) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/auctions/${auctionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete auction");
      }
      if (refreshAuctions) {
        await refreshAuctions();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="grid grid-cols-6 row-cols-auto gap-0 h-auto min-h-[250px] w-[216px] min-w-[216px] bg-white rounded-[16px] align-middle overflow-hidden shadow-2xl ">
        <div className="col-start-1 col-end-3 flex items-center justify-start pl-[8px] ">
          <OutbidSmall />
        </div>
        <div className="col-span-2 col-end-7 px-[8px] py-[4px] text-primary">
          {getHoursDifference(currentTime, endTime) > 24 ? (
            <SmallTimeTag time={"24h"} />
          ) : (
            <SmallTimeTag time={"2d"} />
          )}
        </div>
        <div className="col-span-7 px-[8px] py-[4px]  text-primary">
          {auction.title}
        </div>
        <div className="col-start-1 col-end-3 px-[8px] py-[4px]  text-primary font-bold">
          {auction.startingBid}€
        </div>
        <div className="col-start-1 col-end-7 h-[150px] px-[8px] py-[4px]  text-primary">
          <img
            className="rounded-[8px] w-full h-full object-cover"
            src={`http://localhost:5000/auctions/getimage/${auction.images}`}
          ></img>
        </div>

        {isAuctionActive && isCurrentUserOwner && (
          <div className="flex justify-between col-span-7 row-end-6 p-2 mt-auto bg-white">
            <button
              onClick={() => handleDeleteAuction(auction.id)}
              className="w-1/3 px-2 py-1 text-xs bg-white border-[1px] border-(--main-black-color) text-(--text-primary) rounded-[16px] hover:cursor-pointer "
            >
              Icon
            </button>
            <button
              onClick={() => {
                toggleModal();
              }}
              className="w-2/3 min-h-[40px] px-2 py-1 text-xs bg-(--main-black-color) font-medium text-[14px] text-white rounded-[16px] hover:cursor-pointer"
            >
              Edit
            </button>
            {modal && (
              <EditAuction auction={auction} onClose={() => toggleModal()} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Card;
