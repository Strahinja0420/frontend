import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { changePasswordAPI } from "../../api/changePasswordApi";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";

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
              <div className="relative">
                <input
                  {...register("currentPassword")}
                  className="w-full rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px] pr-10"
                  type="password"
                  id="currentPassword"
                />
                <button
                  type="button"
                  className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                  onClick={() => {
                    const input = document.getElementById(
                      "currentPassword"
                    ) as HTMLInputElement;
                    if (input) {
                      input.type =
                        input.type === "password" ? "text" : "password";
                    }
                  }}
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
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
              <div className="relative">
                <input
                  className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px] w-full"
                  type="password"
                  id="newPassword"
                  {...register("newPassword")}
                />
                <button
                  type="button"
                  className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                  onClick={() => {
                    const input = document.getElementById(
                      "newPassword"
                    ) as HTMLInputElement;
                    if (input) {
                      input.type =
                        input.type === "password" ? "text" : "password";
                    }
                  }}
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
              {errors.newPassword && (
                <div className="text-red-500">{errors.newPassword.message}</div>
              )}
            </div>

            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="repeatNewPassword">
                Repeat New Password
              </label>
              <div className="relative">
                <input
                  className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px] w-full"
                  type="password"
                  id="repeatNewPassword"
                  {...register("repeatPassword")}
                />
                <button
                  type="button"
                  className="absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2 hover:text-gray-600"
                  onClick={() => {
                    const input = document.getElementById(
                      "repeatNewPassword"
                    ) as HTMLInputElement;
                    if (input) {
                      input.type =
                        input.type === "password" ? "text" : "password";
                    }
                  }}
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
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
                className="bg-(--light-gray) rounded-[16px] text-(--text-primary) font-medium text-[16px] p-2 hover:cursor-pointer hover:scale-105 "
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-(--primary-yellow) rounded-[16px] text-(--text-primary) font-medium text-[16px] p-2 hover:cursor-pointer hover:scale-105"
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
