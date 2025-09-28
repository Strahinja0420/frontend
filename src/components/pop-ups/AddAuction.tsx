import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { addAuctionAPI } from "../../api/addAuctionApi";
import { Euro, Trash } from "lucide-react";
import { useEffect, useState } from "react";

interface AddAuctionProps {
  onClose?: () => void;
}

const AddAuctionSchema = z.object({
  images: z.instanceof(FileList).optional(),
  title: z.string().min(1),
  description: z.string().min(1),
  startingBid: z.string().min(1),
  endDate: z.string(),
  category: z.any(),
});

type FormFields = z.infer<typeof AddAuctionSchema>;

const AddAuction: React.FC<AddAuctionProps> = ({ onClose }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
    resetField,
  } = useForm<FormFields>({
    resolver: zodResolver(AddAuctionSchema),
    defaultValues: {
      category: "OTHER",
    },
  });

  const images = watch("images");

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
      endTime: new Date(data.endDate).toISOString(),
    };
    // console.log(payload);

    try {
      await addAuctionAPI.addAuction(payload);
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
    setPreview(null);
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-opacity-25 backdrop-blur-md ">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center bg-white flex-column rounded-[16px] p-3 gap-3 min-w-[550px]">
            <h4 className="text-[23px] text-(--text-primary) font-bold self-start">
              Add auction
            </h4>
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
                    className="absolute inset-0 w-full h-full object-contain rounded-[16px]  pointer-events-none"
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
              <label className="self-start font-light" htmlFor="title">
                Title
              </label>
              <input
                {...register("title")}
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px] placeholder:text-(--text-gray) placeholder:font-light"
                type="text"
                id="title"
                placeholder="Title"
              />
              {errors.title && (
                <div className="text-red-500">{errors.title.message}</div>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start font-light" htmlFor="description">
                Description
              </label>
              <textarea
                {...register("description")}
                id="description"
                placeholder="Description"
                className="rounded-[16px] border-1 border-gray-200 p-2  min-h-[40px] placeholder:text-(--text-gray) placeholder:font-light"
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>

            <div className="flex w-full gap-4">
              <div className="flex flex-col gap-2">
                <label
                  className="self-start font-light"
                  htmlFor="startingPrice"
                >
                  Starting price
                </label>
                <div className="relative">
                  <input
                    {...register("startingBid")}
                    type="number"
                    id="startingPrice"
                    className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px] w-full [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none placeholder:text-(--text-gray) placeholder:font-light"
                    placeholder="Price"
                  />
                  <div className="absolute text-(--text-gray) transform -translate-y-1/2 right-3 top-1/2 ">
                    <Euro size={20} />
                  </div>
                </div>
                {errors.startingBid && (
                  <div className="text-red-500">
                    {errors.startingBid.message}
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full gap-2">
                <label className="self-start font-light" htmlFor="endDate">
                  {" "}
                  End date
                </label>
                <input
                  {...register("endDate")}
                  type="datetime-local"
                  id="endDate"
                  className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                />
                {errors.endDate && (
                  <div className="text-red-500">{errors.endDate.message}</div>
                )}
              </div>
            </div>

            <input className="hidden" {...register("category")}></input>

            <div className="flex justify-end w-full gap-3">
              <button
                onClick={onClose}
                className="bg-(--light-gray) rounded-[16px] text-(--text-primary) font-medium text-[16px] p-2 hover:cursor-pointer"
              >
                Cancel
              </button>
              <button className="bg-(--primary-yellow) rounded-[16px] text-(--text-primary) font-medium text-[16px] p-2 hover:cursor-pointer">
                {isSubmitting ? "Creating..." : "Start auction"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAuction;
