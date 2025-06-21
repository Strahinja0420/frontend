import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { changePasswordAPI } from "../../api/changePasswordApi";
import { useNavigate } from "react-router-dom";

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
    repeatPassword: z.string().min(1, "Please repeat your new password"),
  })
  .refine((data) => data.newPassword === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

type FormFields = z.infer<typeof ChangePasswordSchema>;

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      // console.log(data);
      

      changePasswordAPI.update({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
       if (onClose) {
        onClose();
      }
      navigate("/login"); 
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Failed to change your password",
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center w-screen h-screen bg-opacity-25 backdrop-blur-md ">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center bg-white flex-column rounded-[16px] p-3 gap-3 min-w-[550px]">
            <p className="text-[23px] text-(--text-primary) font-bold self-start">
              Change Password
            </p>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="currentPassword">
                Current Password
              </label>
              <input
                {...register("currentPassword")}
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                type="text"
                id="currentPassword"
              />
              {errors.currentPassword && (
                <div className="text-red-500">
                  {errors.currentPassword.message}
                </div>
              )}
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="newPassword">
                New Password
              </label>
              <input
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                type="text"
                id="newPassword"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <div className="text-red-500">{errors.newPassword.message}</div>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="repeatNewPassword">
                Repeat New Password
              </label>
              <input
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                type="text"
                id="repeatNewPassword"
                {...register("repeatPassword")}
              />
              {errors.repeatPassword && (
                <div className="text-red-500">
                  {errors.repeatPassword.message}
                </div>
              )}
            </div>

            {errors.root && (
              <div className="text-red-500">{errors.root.message}</div>
            )}

            <div className="flex justify-end w-full gap-3">
              <button
                type="button"
                className="bg-(--light-gray) rounded-[16px] text-(--text-primary) font-medium text-[16px] p-2 hover:cursor-pointer"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-(--primary-yellow) rounded-[16px] text-(--text-primary) font-medium text-[16px] p-2 hover:cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
