import { useState } from "react";
import type { Auction } from "../../types/types";

interface AddAuctionProps {
  auction: Auction;
  onClose: () => void;
}

function EditAuction({ onClose, auction }: AddAuctionProps) {
  const [image, setImage] = useState<File | null>(null);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-opacity-25 backdrop-blur-md">
        <form action="">
          <div className="flex flex-col items-center bg-white flex-column rounded-[16px] p-3 gap-3 min-w-[550px]">
            <p className="text-[23px] text-(--text-primary) font-bold self-start">
              Edit Auction
            </p>
            <div className="p-4 py-10 bg-(--light-gray) text-center rounded-[16px] border-0 w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
                id="image-upload"
                placeholder=""
              />
              <label className="">
                {auction.images ? (
                  <img
                    src={`http://localhost:5000/auctions/getimage/${auction.images}`}
                    alt="Preview"
                    className="mx-auto mb-2 max-h-40 rounded-[16px]"
                  />
                ) : (
                  <button className="p-2 border-black cursor-pointer border-1 rounded-[16px]">
                    Add image
                  </button>
                )}
              </label>
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="title">
                Title
              </label>
              <input
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                type="text"
                id="title"
                value={auction.title}
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                value={auction.description}
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="endDate">
                {" "}
                End date
              </label>
              <input
                type="date"
                id="endDate"
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                value={"2011-09-29"}
              />
            </div>

            <div className="flex justify-end w-full gap-3">
              <button
                onClick={onClose}
                className="bg-(--light-gray) rounded-[16px] text-(--text-primary) font-medium text-[16px] p-2 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button className="bg-(--primary-yellow) rounded-[16px] text-(--text-primary) font-medium text-[16px] p-2 hover:cursor-pointer">
                Start auction
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditAuction;
