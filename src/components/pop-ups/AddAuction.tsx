import React, { useState } from "react";

interface AddAuctionProps {
  onClose: () => void;
}

function AddAuction({ onClose }: AddAuctionProps) {
  const [image, setImage] = useState<File | null>(null);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-opacity-25 backdrop-blur-md ">
        <form action="">
          <div className="flex flex-col items-center bg-white flex-column rounded-[16px] p-3 gap-3 min-w-[550px]">
            <p className="text-[23px] text-(--text-primary) font-bold self-start">
              Add auction
            </p>
            <div className="p-4 py-10 bg-(--light-gray) text-center rounded-[16px] border-0 w-full">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="hidden"
                id="image-upload"
              />
              <label className="">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                    className="mx-auto mb-2 max-h-40"
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
                placeholder="Title"
              />
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="description">
                Description
              </label>
              <input
                type="text"
                id="description"
                placeholder="Description"
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
              />
            </div>

            <div className="flex w-full gap-4">
              <div className="flex flex-col gap-2">
                <label className="self-start" htmlFor="startingPrice">
                  Starting price
                </label>
                <input
                  type="number"
                  id="startingPrice"
                  className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                  placeholder="Price"
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
                />
              </div>
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

export default AddAuction;
