import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { registerAPI } from "../../api/registerApi";
import { zodResolver } from "@hookform/resolvers/zod";

const registrationSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
    repeatPassword: z.string().min(1, "Please repeat the password"),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords don't match",
    path: ["repeatPassword"],
  });

export type RegistrationPayload = Omit<
  z.infer<typeof registrationSchema>,
  "repeatPassword"
>;

type FormFields = z.infer<typeof registrationSchema>;

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log("Form submitted:", data);

    try {
      const { repeatPassword, ...registrationData } = data;

      const response = await registerAPI.register(registrationData);
      // console.log("Full registration response:", response);

      /* console.log("response.token:", response.token);
    console.log("response.access_token:", response.access_token);
    console.log("response.data:", response.data); */

      const token = response.access_token;

      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("token", token);

      navigate("/profile");
    } catch (error) {
      console.error("Registration error:", error);
      setError("root", {
        type: "manual",
        message: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <div className="register-form w-1/4 bg-white px-[8px] py-[16px] shadow-lg flex flex-col items-center h-full gap-[16px] overflow-auto">
      <Link to={"/"}>
        <img className="px-[8px] py-[16px]" src="src/assets/images/Logo.png" />
      </Link>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 flex-grow flex flex-col justify-stretch px-[8px] py-[16px]"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-extrabold ">Hello!</h2>
          <p className="mb-8 text-center text-gray-600">
            Please enter your details
          </p>
        </div>

        {/* Display root errors */}
        {errors.root && (
          <div className="text-center text-red-500">{errors.root.message}</div>
        )}

        <div className="flex w-full gap-4">
          <div className="flex flex-col min-w-0 gap-1">
            <p>Name</p>
            <input
              {...register("firstName")}
              type="text"
              placeholder="Name"
              className="flex-1 border min-h-[40px] min-w-0  rounded-[16px] px-4 py-2"
            />
            {errors.firstName && (
              <div className="text-red-500">{errors.firstName.message}</div>
            )}
          </div>
          <div className="flex flex-col min-w-0 gap-1">
            <p>Surname</p>
            <input
              {...register("lastName")}
              type="text"
              placeholder="Surname"
              className="flex-1 border min-h-[40px] min-w-0  rounded-[16px] px-4 py-2"
            />
            {errors.lastName && (
              <div className="text-red-500">{errors.lastName.message}</div>
            )}
          </div>
        </div>
        <div className="flex flex-col min-w-0 gap-1">
          <p>Email</p>
          <input
            {...register("email")}
            type="email"
            placeholder="E-mail"
            className="w-full border min-h-[40px]  rounded-[16px] px-4 py-2"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="flex flex-col min-w-0 gap-1">
          <p>Password</p>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="w-full border min-h-[40px]  rounded-[16px] px-4 py-2"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <div className="flex flex-col min-w-0 gap-1">
          <p>Repeat Password</p>
          <input
            {...register("repeatPassword")}
            type="password"
            placeholder="Repeat password"
            className="w-full border min-h-[40px]  rounded-[16px] px-4 py-2"
          />
          {errors.repeatPassword && (
            <div className="text-red-500">{errors.repeatPassword.message}</div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-primary font-bold px-[16px] py-[8px] rounded-[16px] bg-(--primary-yellow) hover:bg-(--hover-yellow) cursor-pointer disabled:opacity-50"
        >
          {isSubmitting ? "Signing up..." : "Sign up"}
        </button>

        <p className="mt-auto text-sm text-center text-gray-500">
          Already have an account?{" "}
          <Link to={"/login"} className="font-bold">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;
