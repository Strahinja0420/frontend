import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Auction, User } from "../types/types";
import { auctionAPI } from "../hooks/getAuctionById";
import OutbidSmall from "./Tags/SmallTag";
import SmallTimeTag from "./TimeTags/SmallTimeTag";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Bidder } from "../hooks/getBidderInfo";
import { format } from "date-fns";

const bidSchema = z.object({
  bid: z.string().min(1, "Field must not be empty"),
});

type FormFields = z.infer<typeof bidSchema>;

const AuctionComponent = () => {
  const { auctionId } = useParams<{ auctionId: string }>();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [activeTab, setActiveTab] = useState<"bid" | "auto-bid">("bid");
  const [error, setError] = useState<string | null>(null);
  const [bidderInfo, setBidderInfo] = useState<User | null>(null);

  useEffect(() => {
    if (!auctionId) {
      setError("No auction ID provided");
      return;
    }

    const loadAuction = async () => {
      try {
        const auctionData = await auctionAPI.getAuctionById(Number(auctionId));
        setAuction(auctionData);
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to load auction";
        setError(message);
      }
    };

    loadAuction();
  }, [auctionId]);

  // console.log(auction);

  useEffect(() => {
    if (!auction?.bids?.length) return;

    const fetchAllBidders = async () => {
      try {
        const bidderIdsToFetch = auction.bids
          .filter((bid) => !bid.bidder && bid.bidderId)
          .map((bid) => bid.bidderId);

        if (bidderIdsToFetch.length === 0) return;

        const biddersPromises = bidderIdsToFetch.map((bidderId) =>
          Bidder.getBidderInfo(bidderId)
        );
        const fetchedBidders = await Promise.all(biddersPromises);

        setAuction((prev) => {
          if (!prev) return null;

          const updatedBids = prev.bids.map((bid) => {
            if (!bid.bidder && bid.bidderId) {
              const foundBidder = fetchedBidders.find(
                (b) => b.id === bid.bidderId
              );
              if (foundBidder) {
                return { ...bid, bidder: foundBidder };
              }
            }
            return bid;
          });

          return { ...prev, bids: updatedBids };
        });
      } catch (error: any) {
        const message =
          error.response?.data?.message ||
          error.message ||
          "Failed to load bidders";
        setError(message);
      }
    };

    fetchAllBidders();
  }, [auction?.bids]);

  // console.log(bidderInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(bidSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You must be logged in to place a bid");
      }

      const bidAmount = Number(data.bid);

      if (isNaN(bidAmount)) {
        throw new Error("Invalid bid amount");
      }

      const response = await axios.post(
        `http://localhost:5000/auctions/${auctionId}/bid`,
        {
          ammount: bidAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedAuction = await auctionAPI.getAuctionById(Number(auctionId));
      setAuction(updatedAuction);

      alert("Bid placed successfully!");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to place bid"
        : error instanceof Error
          ? error.message
          : "Unknown error occurred";

      setError(message);
      console.error("Bid error:", error);
    }
  };

  if (!auction) return <div className="p-4">No auction found</div>;

  const getHoursDifference = (startTime: Date, endTime: Date): number =>
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);

  const currentTime = new Date();
  if (!auction.endTime) {
    throw new Error("Date string cannot be undefined");
  }
  const endTime = new Date(auction.endTime);
  const isAuctionActive = currentTime < endTime;

  if (error) {
    console.log(error);
  }

  return (
    <>
      <div
        className="grid grid-cols-2 grid-rows-5 gap-3 overflow-hidden"
        style={{ height: "calc(100vh - 100px)" }}
      >
        <div className="flex h-full w-full pl-6 row-span-5 rounded-[16px]">
          <img
            className="self-center justify-self-center h-full w-full rounded-[16px]"
            src={`http://localhost:5000/auctions/getimage/${auction.images}`}
            alt=""
          />
        </div>

        <div className="flex flex-col w-full h-full row-span-2 bg-white rounded-[16px] overflow-visible ">
          <div className="px-3 pt-3 ">
            <div className="flex items-center justify-between w-full">
              {" "}
              <OutbidSmall auction={auction} />
              <SmallTimeTag auction={auction}/>
            </div>

            <p className="text-[32px] font-bold text-black pt-1">
              {auction.title}
            </p>

            <p className="text-[16px] font-light text-black pt-1">
              {auction.description}
            </p>

            {auction.status === "ENDED" ? (
              "Sorry the auction ended you cant bid anymore"
            ) : (
              <>
                <div className="flex pt-2 ">
                  <div className="bg-[#EDF4F2]  rounded-[32px]">
                    <button
                      onClick={() => setActiveTab("bid")}
                      className={`w-[97px] h-[40px] font-medium rounded-[16px] transition-all duration-200 ease-in-out ${
                        activeTab === "bid"
                          ? "bg-(--main-black-color) text-white"
                          : "text-(--text-primary) hover:text-white hover:bg-(--main-black-color)"
                      }`}
                    >
                      Bid
                    </button>
                    <button
                      onClick={() => setActiveTab("auto-bid")}
                      className={`w-[97px] h-[40px] font-medium rounded-[16px] transition-all duration-200 ease-in-out ${
                        activeTab === "auto-bid"
                          ? "bg-(--main-black-color) text-white"
                          : "text-(--text-primary) hover:text-white hover:bg-(--main-black-color)"
                      }`}
                    >
                      Auto bid
                    </button>
                  </div>
                </div>

                <div className="flex items-end justify-end pt-3 ">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="pr-2">Bid:</label>
                    <input
                      {...register("bid")}
                      className="rounded-[16px] border-1 w-[83px] border-gray-200 p-2 mr-2 max-h-[40px] min-h-[40px]"
                      type="string"
                      id="title"
                      placeholder="Bid"
                    />
                    {errors.bid && (
                      <div className="text-red-500">{errors.bid.message}</div>
                    )}
                    <button
                      type="submit"
                      className="primary-yellow-bg text-primary font-medium px-[16px] py-[8px] rounded-[16px] hover:bg-yellow-400 hover:cursor-pointer"
                    >
                      Place bid
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex  h-full row-span-3 bg-white rounded-[16px]">
          <div className="w-full p-3">
            <p className="text-[32px] font-bold pb-2">{`Bidding history(${auction._count.bids})`}</p>
            {auction.bids.map((bid) => (
              <div key={bid.id} className="pb-3 ">
                <div className="flex items-center justify-between">
                  <div>
                    {bid.bidder ? (
                      <p className="text-[16px] font-light text-black">
                        {bid.bidder.firstName} {bid.bidder.lastName}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">
                        Loading bidder info...
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {format(new Date(bid.createdAt), "HH:mm dd.MM.yyyy")}
                  </div>
                  <p className="primary-yellow-bg text-[16px] font-semibold px-[14px] py-[4px] rounded-[16px] min-w-[100px] text-center">
                    {bid.amount.toFixed(2)}€
                  </p>
                </div>
              </div>
            ))}
            <p></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuctionComponent;
