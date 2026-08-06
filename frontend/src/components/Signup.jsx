import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Signup = () => {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");
  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };
  const onSubmit = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    await axios
      .post("/api/user/signup", userData)
      .then((response) => {
        console.log("User created successfully", response.data);
        if (response.data) {
          toast.success("Signup  successfully");
        }
        // Restructure the data to match login format
        const userData = {
          message: response.data.message,
          user: {
            _id: response.data._id,
            name: response.data.name,
            email: response.data.email,
          },
        };
        localStorage.setItem("user", JSON.stringify(userData)); // parse kiya data ko and then store in localStorage
        setAuthUser(userData); // set the user in auth context
      })
      .catch((error) => {
        console.error("Error creating user", error);
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          // className='border border-white px-6 py-3 rounded-md w-[25%] space-y-3'>
          className="border border-white px-6 py-3 rounded-md w-full max-w-md space-y-3"
        >
          <h1 className="text-bold  items-center">Create New Account</h1>
          <div className="space-y-2">
            {/* // Username */}
            <label className="input input-bordered flex items-center gap-2 pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Username"
                {...register("name", { required: true })}
              />
            </label>
            {errors.name && (
              <span className="text-red-500">*This field is required*</span>
            )}
            {/* // email */}
            <label className="input input-bordered flex items-center gap-2 pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                className="grow"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </label>
            {errors.email && (
              <span className="text-red-500">*This field is required*</span>
            )}

            {/* password  */}
            <label className="input input-bordered flex items-center gap-2 pt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="password"
                {...register("password", { required: true })}
              />
            </label>
            {errors.password && (
              <span className="text-red-500">*This field is required*</span>
            )}
            {/* confirm password  */}
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                type="password"
                className="grow"
                placeholder="confirm Password"
                {...register("confirmPassword", {
                  required: true,
                  validate: validatePasswordMatch,
                })}
              />
            </label>
            {errors.confirmPassword && (
              <span className="text-red-500">
                *{errors.confirmPassword.message}*
              </span>
            )}
            <div className="flex justify-between pt-5">
              <h1>
                Have already account?{" "}
                <Link
                  to={"/login"}
                  className="text-red-700 underline cursor-pointer"
                >
                  Login
                </Link>
              </h1>
              <input
                type="submit"
                value="Signup"
                className="text-white bg-blue-500 p-2 rounded-md"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
