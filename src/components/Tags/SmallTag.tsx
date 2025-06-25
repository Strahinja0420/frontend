import React, { useEffect, useState } from "react";
import type { Auction } from "../../types/types";

interface StatusTagProps {
  auction: Auction;
}

const OutbidSmall: React.FC<StatusTagProps> = ({auction}) => {
  // console.log(auction);
  

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return {
          bg: "bg-(--primary-yellow)", 
          text: "text-(--text-primary)", 
          label: "In progress", 
        };
      case "ENDED":
        return {
          bg: "bg-black", 
          text: "text-white", 
          label: "Done",
        };
      case "DRAFT":
        return {
          bg: "bg-yellow-100", 
          text: "text-yellow-800", 
          label: "Draft",
        };
      case "CANCELLED":
        return {
          bg: "bg-red-100", 
          text: "text-red-800", 
          label: "Cancelled",
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-800",
          label: "Unknown",
        };
    }
  };

  const statusStyles = getStatusStyles(auction.status);
  return (
    <div className={`flex items-center justify-center rounded-[16px] w-fit px-3 py-1 whitespace-nowrap ${statusStyles.bg} ${statusStyles.text}`}>
      <p className="text-[10px] font-light">{statusStyles.label}</p>
    </div>
  );
};

export default OutbidSmall;
