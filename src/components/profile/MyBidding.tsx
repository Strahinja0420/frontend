import React from "react";

const MyBidding = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)] ">
        <p className="text-center text-[32px] font-bold text-(--text-primary)">
          No bidding in progress!
        </p>
        <p className="text-center text-[16px] font-light text-(--text-gray)">
          Start bidding by finding new items you <br />
          like on "Auction" page!
        </p>
      </div>
    </>
  );
};

export default MyBidding;
