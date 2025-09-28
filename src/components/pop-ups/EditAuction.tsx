import { useEffect, useState } from "react";
import type { Auction } from "../../types/types";
import { z } from "zod";
import { updateAuctionAPI } from "../../api/updateAuctionApi";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";

interface AddAuctionProps {
  auction: Auction;
  onClose: () => void;
}

const UpdateAuctionSchema = z.object({
  images: z.instanceof(FileList).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  endTime: z.string(),
});

type FormFields = z.infer<typeof UpdateAuctionSchema>;

const EditAuction: React.FC<AddAuctionProps> = ({ onClose, auction }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    setValue,
    watch,
    resetField,
  } = useForm<FormFields>({
    resolver: zodResolver(UpdateAuctionSchema),
  });

  const images = watch("images");
  console.log(auction);
  

  useEffect(() => {
    if (auction) {
      setValue("title", auction.title);
      setValue("description", auction.description);
      const endDate = auction.endTime
        ? new Date(auction.endTime).toISOString().split("T")[0]
        : "";
      setValue("endTime", endDate);
      
      
      if (auction.images) {
        setPreview(`http://localhost:5000/auctions/getimage/${auction.images}`);
      }
    }
  }, [auction, setValue]);

  useEffect(() => {
    if (images && images.length > 0) {
      const file = images[0];
      const url = URL.createObjectURL(file);
      setPreview(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [images]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!data.images) {
      throw Error("No file selected");
    }
    console.log(data.images[0]);

    const payload = {
      ...data,
      images: data.images[0],
      endTime: new Date(data.endTime).toISOString(),
    };

    try {
      await updateAuctionAPI.update(auction.id, payload);
      if (onClose) {
        onClose();
      }
      window.location.reload();
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Invalid data",
      });
      console.log(error);
    }
  };

  const resetPicture = () => {
    resetField("images");
    setPreview( null); 
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-opacity-25 backdrop-blur-md">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center bg-white flex-column rounded-[16px] p-3 gap-3 min-w-[550px]">
            <p className="text-[23px] text-(--text-primary) font-bold self-start">
              Edit Auction
            </p>
            <div className="flex items-center justify-center p-4 pt-2 bg-(--light-gray) text-center rounded-[16px] border-0 w-full h-[200px] relative">
              <input
                type="file"
                accept="image/*"
                {...register("images")}
                id="image-upload"
                className="hidden"
              />

              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Preview"
                    className="absolute inset-0 w-full h-full object-contain rounded-[16px] pointer-events-none"
                  />
                  <div className="flex content-end justify-end w-full h-full">
                    <button
                      type="button"
                      onClick={resetPicture}
                      className="cursor-pointer"
                    >
                      <div className="text-white bg-black px-4 py-2 rounded-[32px]">
                        <Trash></Trash>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <label
                  htmlFor="image-upload"
                  className="flex items-center justify-center w-[125px] h-[50px] border-2 border-black rounded-[32px] cursor-pointer bg-(--light-gray) hover:bg-gray-100 transition"
                >
                  Add Picture
                </label>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="title">
                Title
              </label>
              <input
                {...register('title')}
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                type="text"
                id="title"
              />
              {errors.title && (
                <div className="text-red-500">{errors.title.message}</div>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="description">
                Description
              </label>
              <input
                {...register('description')}
                type="text"
                id="description"
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="endTime">
                End date
              </label>
              <input
                {...register('endTime')}
                type="date"
                id="endTime"
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
              />
              {errors.endTime && (
                <div className="text-red-500">{errors.endTime.message}</div>
              )}
            </div>

            <div className="flex justify-end w-full gap-3">
              <button
                type="button"
                onClick={onClose}
                className="bg-(--light-gray) rounded-[16px] text-(--text-primary) font-medium text-[16px] px-3 py-1.5 hover:cursor-pointer"
              >
                Discard changes
              </button>
              <button type="submit" className="bg-(--text-primary) rounded-[16px] text-white font-medium text-[16px] px-3 py-1.5 hover:cursor-pointer">
                {isSubmitting ? "Updating..." : "Update auction"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditAuction;