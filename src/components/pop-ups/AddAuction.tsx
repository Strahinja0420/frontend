import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { addAuctionAPI } from "../../api/addAuctionApi";

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(AddAuctionSchema),
    defaultValues: {
      category: "OTHER",
    },
  });

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

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-opacity-25 backdrop-blur-md ">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center bg-white flex-column rounded-[16px] p-3 gap-3 min-w-[550px]">
            <p className="text-[23px] text-(--text-primary) font-bold self-start">
              Add auction
            </p>
            <div className="p-4 py-10 bg-(--light-gray) text-center rounded-[16px] border-0 w-full">
              <input type="file" {...register("images")} id="image-upload" />
              <label className="">
                <button className="p-2 border-black cursor-pointer border-1 rounded-[16px]">
                  Add image
                </button>
              </label>
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="title">
                Title
              </label>
              <input
                {...register("title")}
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                type="text"
                id="title"
                placeholder="Title"
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
                {...register("description")}
                type="text"
                id="description"
                placeholder="Description"
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
              />
              {errors.description && (
                <div className="text-red-500">{errors.description.message}</div>
              )}
            </div>

            <div className="flex w-full gap-4">
              <div className="flex flex-col gap-2">
                <label className="self-start" htmlFor="startingPrice">
                  Starting price
                </label>
                <input
                  {...register("startingBid")}
                  type="number"
                  id="startingPrice"
                  className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                  placeholder="Price"
                />
                {errors.startingBid && (
                  <div className="text-red-500">
                    {errors.startingBid.message}
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full gap-2">
                <label className="self-start" htmlFor="endDate">
                  {" "}
                  End date
                </label>
                <input
                  {...register("endDate")}
                  type="date"
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
