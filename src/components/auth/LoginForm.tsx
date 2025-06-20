import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { loginAPI } from "../../api/loginApi";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

type FormFields = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    // console.log(data);
    
    try {
      await loginAPI.login(data);
      // console.log(data);
      navigate("/profile");
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "Invalid email or password",
      });
      console.log(error);
      
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormFields>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <div className="register-form w-1/4 bg-white px-[8px] py-[16px] shadow-lg flex flex-col items-center h-full gap-[16px]">
        <Link to={"/"}>
          <img
            className="px-[8px] py-[16px]"
            src="src/assets/images/Logo.png"
            alt="logo"
          />
        </Link>

        <form
          className="w-full space-y-4 flex-grow flex flex-col justify-stretch px-[8px] py-[16px] pt-[60px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-extrabold">Welcome back!</h2>
            <p className="mb-8 text-center text-gray-600">
              Please enter your details
            </p>
          </div>
          <div className="flex flex-col min-w-0 gap-1">
            <p>Email</p>
            <input
              {...register("email")}
              type="email"
              name="email"
              placeholder="E-mail"
              className="w-full border min-h-[40px] rounded-[16px] px-4 py-2"
              aria-invalid={!!errors.email}
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
              name="password"
              placeholder="Password"
              className="w-full border min-h-[40px] rounded-[16px] px-4 py-2"
            />
            {errors.password && (
              <div className="text-red-500">{errors.password.message}</div>
            )}
          </div>
          <div className="flex justify-end w-full">
            <Link to={"/forgotpass"}>
              <p className="text-sm text-gray-600">Forgot password?</p>
            </Link>
          </div>

          {errors.root && (
            <div className="text-red-500">{errors.root.message}</div>
          )}

          <button
            type="submit"
            className="w-full primary-yellow-bg text-primary font-bold px-[16px] py-[8px] rounded-[16px] hover:bg-yellow-400 hover:cursor-pointer"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
          <p className="mt-auto text-sm text-center text-gray-500">
            Don’t have an account?{" "}
            <Link to={"/register"} className="font-bold">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
