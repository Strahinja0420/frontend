import React, { useEffect, useState } from "react";
import { z } from "zod";
import ChangePassword from "./ChangePassword";
import { fetchCurrentUser } from "../../hooks/getCurrentUser";
import type { User } from "../../types/types";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserAPI } from "../../api/updateUserApi";

interface ProfileSettingsProps {
  onClose: () => void;
}

const ProfileSettingsSchema = z.object({
  firstName: z.string().min(1, "Name is required"),
  lastName: z.string().min(1, "Surname is required"),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

type FormFields = z.infer<typeof ProfileSettingsSchema>;

const ProfileSettings: React.FC<ProfileSettingsProps> = ({ onClose }) => {
  const [changePassword, setChangePassword] = useState(false);
  const [user, setUser] = useState<User>();

  const {
    setValue,
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(ProfileSettingsSchema),
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await fetchCurrentUser();
        setUser(currentUser);
        setValue("firstName", currentUser.firstName);
        setValue("lastName", currentUser.lastName);
        setValue("email", currentUser.email);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    loadUser();
  }, [setValue]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await updateUserAPI.update(data);
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
        <div className="flex flex-col items-center bg-white flex-column rounded-[16px] p-3 gap-3 min-w-[550px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="text-[23px] text-(--text-primary) font-bold self-start">
              Profile settings
            </p>
            <div className="flex w-full gap-4">
              <div className="flex flex-col w-full gap-2">
                <label className="self-start" htmlFor="firstName">
                  Name
                </label>
                <input
                  {...register("firstName")}
                  className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                  type="text"
                  id="firstName"
                />
                {errors.firstName && (
                  <div className="text-red-500">{errors.firstName.message}</div>
                )}
              </div>
              <div className="flex flex-col w-full gap-2">
                <label className="self-start" htmlFor="lastName">
                  Surname
                </label>
                <input
                  {...register("lastName")}
                  className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                  type="text"
                  id="lastName"
                />
                {errors.lastName && (
                  <div className="text-red-500">{errors.lastName.message}</div>
                )}
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <label className="self-start" htmlFor="email">
                Email
              </label>
              <input
                {...register("email")}
                className="rounded-[16px] border-1 border-gray-200 p-2 max-h-[40px] min-h-[40px]"
                type="text"
                id="email"
              />
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}
            </div>
          </form>
          <div className="flex flex-col self-start">
            <button
              type="button"
              className="self-start hover:cursor-pointer"
              onClick={() => setChangePassword(!changePassword)}
            >
              Change password
            </button>
            {changePassword && (
              <ChangePassword
                onClose={() => setChangePassword(!changePassword)}
              />
            )}
            <button type="button" className="self-start">
              Change profile picture
            </button>
          </div>
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
      </div>
    </>
  );
};

export default ProfileSettings;
